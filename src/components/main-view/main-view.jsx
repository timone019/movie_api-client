import "./main-view.scss";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col } from "react-bootstrap";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [moviedata, setMovies] = useState([]);
   
  useEffect(() => {
      if (!token) {
        return;
      }

      fetch("https://mymovies-8b73c95d0ae4.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((moviedata) => {
          const moviesFromApi = moviedata.map((movie) => {
            return {
              _id: movie._id,
              Title: movie.Title,
              Description: movie.Description,
              Genre: {
                Name: movie.Genre.Name,
                Description: movie.Genre,
              },
              Director: {
                Name: movie.Director.Name,
                Bio: movie.Director.Bio,
                Birth: movie.Director.Birth,
              },
              ImagePath: movie.ImagePath,
              Featured: movie.Featured,
            };
          });

          setMovies(moviesFromApi);
        });
    }, [token]);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />

        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView
                        onSignup={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        }}  
                        />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/moviedata/:title"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : moviedata.length === 0 ? (
                    <Col> The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView token={token} moviedata={moviedata.find(movie => movie.Title === useParams().title)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : moviedata.length === 0 ? (
                    <Col> The list is empty!</Col>
                  ) : (
                    <>
                      {moviedata.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
        {user && (
          <footer className="d-flex justify-content-center align-items-center">
            <button
            onClick={() => {
              localStorage.clear();
              setUser(null);
              setToken(null);
            }}
            className="logout-button md-4 mb-3"
            style={{ cursor: "pointer", width: "100px", height: "40px" }}>
              Logout
            </button>
          </footer>
        )}
      </Container>
    </BrowserRouter>
  );
};
