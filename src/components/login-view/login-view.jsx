import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, CardGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./login-view.scss";
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://mymovies-8b73c95d0ae4.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
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
                  <Form.Group controlId="formUsername">
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      aria-label="username"
                      aria-required="true"
                      value={username}
                      placeholder="Enter username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      aria-label="password"
                      aria-required="true"
                      value={password}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div>
                    <Button
                      className="login-button"
                      variant="primary"
                      type="submit"
                    >
                      Log In
                    </Button>
                  </div>
                  <div>
                    <Link 
                    to="/signup"
                    className="signup-link"
                    >or Sign Up</Link>
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
