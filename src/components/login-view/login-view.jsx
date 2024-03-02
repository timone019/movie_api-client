import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, CardGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./login-view.scss";
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const copyToClipboard = (ref) => {
    const textToCopy = ref.current.innerText.split(": ")[1];
    navigator.clipboard.writeText(textToCopy);
  };

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
                    <Form.Label>Username:</Form.Label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                        <Button
                          variant="info"
                          className="paste-button"
                          onClick={async () =>
                            setUsername(await navigator.clipboard.readText())
                          }
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: "2px 5px",
                            fontSize: "10px",
                          }}
                        >
                          Paste
                        </Button>
                      <Form.Control
                        type="text"
                        aria-label="username"
                        aria-required="true"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />

                      <Button
                        variant="info"
                        className="clear-button"
                        onClick={() => setUsername("")}
                        style={{ marginLeft: "10px" }}
                      >
                        Clear
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                    <Form.Control
                     type="password"
                     aria-label="password"
                     aria-required="true"
                     value={password}
                     placeholder="Enter password"
                     onChange={(e) => setPassword(e.target.value)}
                     required
                   />
                    <Button
                          variant="info"
                          className="paste-button"
                          onClick={async () =>
                            setPassword(await navigator.clipboard.readText())
                          }
                          style={{
                            position: "absolute",
                            left: "60%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: "2px 5px",
                            fontSize: "10px",
                          }}
                        >
                          Paste
                        </Button>
                        </div>
                      <Button
                        variant="info"
                        className="clear-button"
                        onClick={() => setUsername("")}
                        style={{ marginLeft: "10px" }}
                      >
                        Clear
                      </Button>
                    </div>
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
                    <Link to="/signup" className="signup-link">
                      or Sign Up
                    </Link>
                  </div>

                  <br />
                  <div>Demo User:</div>

                  <span ref={usernameRef}>
                    username: <strong>testuser</strong>
                  </span>
                  <Button
                    variant="outline-secondary"
                    style={{
                      padding: "2px 5px",
                      fontSize: "10px",
                      marginLeft: "10px",
                    }}
                    onClick={() => copyToClipboard(usernameRef)}
                  >
                    Copy
                  </Button>
                  <div>
                    <span ref={passwordRef}>
                      password: <strong>password</strong>
                    </span>
                    <Button
                      variant="outline-secondary"
                      style={{
                        padding: "2px 5px",
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                      onClick={() => copyToClipboard(passwordRef)}
                    >
                      Copy
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

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
