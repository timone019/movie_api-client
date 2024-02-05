import { useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateUser = ({ user, setUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    FullName: user.FullName,
    Username: user.Username,
    Password: user.Password,
    Email: user.Email,
    Birthday: user.Birthday,
  });

  let date = new Date(user.Birthday);
  let formattedDate = date.toISOString().substring(0, 10);

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

        window.alert("Profile updated successfully");
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
        window.alert("Profile deleted successfully");
        localStorage.removeItem("user"); 
        localStorage.removeItem("token"); 
        setUser(null); // Clear the user data from the state
        navigate("/login"); 
      } else {
        console.error("failed to delete profile:", response.statusText);
        window.alert("Profile not Deleted");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      window.alert("Profile not Deleted");
    }
  };

  return (
    <>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>FullName:</Form.Label>
          <Form.Control
            type="text"
            name="FulName"
            defaultValue={user.FullName}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter First and Last Name"
          />
        </Form.Group>

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
            defaultValue="user.Password"
            onChange={(e) => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Enter current password or newly desired password"
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
            defaultValue={formattedDate}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>

        <ButtonToolbar aria-label="Toolbar with button groups" className="mt-3">
          <ButtonGroup className="me-5" aria-label="First group">
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Second group">
            <Button variant="danger" type="button" onClick={handleDeleteSubmit}>
              Delete Profile
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </>
  );
};

export default UpdateUser;
