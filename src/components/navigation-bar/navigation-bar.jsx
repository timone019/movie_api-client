// import './navigation-bar.scss';
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Sun, Moon } from "react-bootstrap-icons";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const gonavigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const ref = useOnclickOutside(() => {
    setExpanded(false);
  });

  // Load the initial theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Use an effect to update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Add the theme as a class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const navigateBack = () => {
    try {
      gonavigate(-1);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const logoutAndNavigate = () => {
    try {
      onLoggedOut();
      gonavigate("/login");
    } catch (error) {
      console.error("Logout or navigation failed:", error);
    }
  };

  return (
    <Navbar
      ref={ref}
      bg="info"
      variant="light"
      expand="sm"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      onClick={() => window.scrollTo(0, 0)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3>Movies App</h3>
        </Navbar.Brand>

        <Form.Check
          type="switch"
          id="custom-switch"
          label={theme === "light" ? <Sun /> : <Moon />}
          checked={theme === "dark"}
          onChange={toggleTheme}
        />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onClick={() => setExpanded(false)}>
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <h4>Log In</h4>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <h4>Sign Up</h4>
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  <h4>Home</h4>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <h4>Profile</h4>
                </Nav.Link>
                <Nav.Link onClick={navigateBack}>
                  <h4>Back</h4>
                </Nav.Link>
                <Nav.Link onClick={logoutAndNavigate}>
                  <h4>Log Out</h4>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
