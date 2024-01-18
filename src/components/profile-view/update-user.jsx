import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    username: {$:Username}, // Replace with the actual user ID
    // name: '',
    email: {$:Email},
    // Add more fields as needed
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from the server based on user ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/users/${userData.id}`); // Replace with your actual API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userData.id]); // Fetch data when the component mounts and whenever user ID changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      userData,
      [name]: value,
    });
  };

  const handleUpdateUser = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User updated successfully!');
        // You may want to handle success, e.g., redirect or show a success message
      } else {
        console.error('Failed to update user:', response.status);
        // Handle error, show an error message, etc.
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, show an error message, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Update</h2>
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={userData.name}
            onChange={e => handleUpdate (e) }
            required 
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            defaultValue=''
            onChange={ e => handleUpdate (e) }
            required
            minLength="8"
            placeholder="Your password must be at least 8 characters or more"

          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={userData.Email}
            onChange={ e => handleUpdate (e) }
            required
            placeholder="Enter email"

          />
        </Form.Group>


        <Button variant="primary" type="button" onClick={handleUpdateUser}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UpdateUser;
