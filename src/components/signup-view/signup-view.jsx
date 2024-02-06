import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, CardGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup-view.scss";

export const SignupView = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      FullName: fullName,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    // Calculate the age
  const age = new Date().getFullYear() - new Date(birthday).getFullYear();

  // Check if the age is less than 13
  if (age < 13) {
    alert("You must be at least 13 years old to sign up.");
    return;
  }

    fetch("https://mymovies-8b73c95d0ae4.herokuapp.com/users/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        alert("Signup successful");
        navigate('/login'); 
      })  
      .catch((error) => {
        console.error(
        "There was an error signing up. Please try again.",
        error
      );
      alert("Signup failed. Please try again.")
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
                      className="signup-button"
                      variant="primary"
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </div>
                  <div>
                    <Link 
                    to="/login"
                    className="login-link"
                    >or Log In</Link>
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
