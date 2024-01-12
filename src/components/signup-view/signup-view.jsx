import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [FullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://mymovies-8b73c95d0ae4.herokuapp.com/users/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signupformFullName">
        <Form.Label>
        Full Name:
        </Form.Label>
        <Form.Control
          type="text"
          value={FullName}
          placeholder="First & Last Name"
          onChange={(e) => setFullName(e.target.value)}
          required

          />
      </Form.Group>

<Form.Group controlId="signupformUsername">
      <Form.Label>
        Username:
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          minLength="6"
          pattern="^[a-zA-Z0-9]+$"
          title="Username can only contain letters and numbers"
          onChange={(e) => setUsername(e.target.value)}
          required
          
        />
      </Form.Group>

      <Form.Group controlId="signupformPassword">
      <Form.Label>
        Password:
        </Form.Label>
        <Form.Control
          type="password"
          value={password}
          minLength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least one special character."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupformEmail">
      <Form.Label>
        Email:
        </Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="signupformBirthday">
      <Form.Label>
        Birthday:
        </Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Sign Up</Button>
    </Form>
  );
};
