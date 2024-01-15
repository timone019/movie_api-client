import { useState } from "react";
import Proptypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      FullName: fullName,
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
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          throw new Error("HTTP error! status: ${response.status}");
        }
        return response.json();
      })
      .then((data) => {
        alert("Signup successful");
      })
      .catch((error) => {
        if (error.message.includes("400")) {
          alert("Bad request. Please check your input data");
        } else if (error.message.includes("500")) {
          alert("Server error. Please try again later");
        } else {
          alert("signup failed, please try again");
        }
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="signupformFullName">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label={fullName}
                      aria-required={true}
                      value={fullName}
                      placeholder="First & Last Name"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupformUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label={username}
                      aria-required={true}
                      value={username}
                      placeholder="Create your Username"
                      minLength="6"
                      pattern="^[a-zA-Z0-9]+$"
                      title="Username can only contain letters and numbers"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupformPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      placeholder="Create your Password"
                      type="password"
                      aria-label={password}
                      aria-required={true}
                      value={password}
                      minLength="8"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least one special character."
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupformEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      placeholder="Enter your Email"
                      type="email"
                      aria-label={email}
                      aria-required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="signupformBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      aria-label={birthday}
                      aria-required={true}
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div>
                    <Button
                      className="signup-button mt-3"
                      variant="primary"
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
