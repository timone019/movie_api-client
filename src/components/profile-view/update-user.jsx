import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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

  const handleUpdate = async (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            defaultValue=""
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

        <br />
        <Button variant="primary" type="submit">
          Update
        </Button>
        <span> Click Update to save & store to Favorite Movie list below</span>
      </Form>
    </>
  );
};

export default UpdateUser;
