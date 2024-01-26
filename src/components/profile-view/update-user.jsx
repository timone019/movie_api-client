import { useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateUser = ({ user, setUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    Username: user.Username,
    Password: user.Password,
    Email: user.Email,
    Birthday: user.Birthday,
  });
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [deletedUser, setDeletedUser] = useState({
  //   Passowrd: "",
  // });
  const handleUpdate = async (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmUpdate = window.confirm(
      "Are you sure you want to update your profile?"
    );
    if (!confirmUpdate) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        console.log("User updated successfully:", updatedUserData);
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const navigate = useNavigate();
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");
    const password = updatedUser.Password; // Get the password from the form
    if (!password) {
      window.alert("Please enter your password to delete your account");
      return;
    }
    try {
      const response = await fetch(
        `https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.alert("User deleted successfully");
        localStorage.removeItem("user"); // Remove the user data from local storage
        localStorage.removeItem("token"); // Remove the token from local storage
        setUser(null); // Clear the user data from the state
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Failed to delete user:", response.statusText);
        window.alert("User not deleted");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      window.alert("User not deleted");
    }
  };

  return (
    <>
      <h2>Update User Info</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.Username}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            defaultValue={user.Password}
            onChange={(e) => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Your password must be at least 8 characters or more"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            defaultValue={user.Email}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            name="Birthday"
            placeholder="Enter your birthday"
            defaultValue={user.Birthday}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <ButtonToolbar aria-label="Toolbar with button groups" className="mt-3">
          <ButtonGroup className="me-5" aria-label="First group">
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Second group">
            <Button variant="danger" type="submit" onClick={handleDeleteSubmit}>
              Delete Profile
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        {/* <br />
        <Button variant="primary" type="submit" className="mr-5" >
          Update Profile
        </Button>
        

        <Button
          variant="danger"
          type="submit"
          onClick={handleDeleteSubmit}
          
        >
          Delete Profile
        </Button> */}
      </Form>
    </>
  );
};

export default UpdateUser;
