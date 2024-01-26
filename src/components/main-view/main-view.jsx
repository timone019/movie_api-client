import "./main-view.scss";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [moviedata, setMovies] = useState([]);
  const { title } = useParams();

  const [favMovies, setFavMovies] = useState([]); // Initialize state for favorite movies
  const addFav = (movieId) => {
    // Update the favMovies state
    setFavMovies((prevFavMovies) => [...prevFavMovies, movieId]);
    
// Make a request to the server to add the movie to the user's favorites
    fetch(
      `https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the user's favorites in the state
        setFavMovies(data.FavoriteMovies);
      })
      .catch((error) => console.error("Error:", error));
  };

  const removeFav = (movieId) => {
    // setFavMovies((prevFavMovies) =>
    //   prevFavMovies.filter((id) => id !== movieId)
    // );

    fetch(
      `https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the user's favorites in the state
        setFavMovies(data.FavoriteMovies);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

// Fetch the user's favorite movies
fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}`, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then(response => response.json())
  .then(data => {
    // Update the favMovies state
    setFavMovies(data.FavoriteMovies);
  })
  .catch(error => console.error('Error:', error));
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }


    fetch("https://mymovies-8b73c95d0ae4.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((moviedata) => {
        // match the movies from the database with the movies from the api
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
            Year: movie.Year,
            TrailerPath: movie.TrailerPath
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
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                          setFavMovies(user.FavoriteMovies);
                        }}
                      />
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
                          <MovieCard
                            movie={movie}
                            isFav={favMovies.includes(movie._id)}
                            addFav={addFav}
                            removeFav={removeFav}
                          />
                        </Col>
                      ))}
                    </>
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
                      <MovieView
                        addFav={addFav}
                        removeFav={removeFav}
                        token={token}
                        movie={moviedata.find((movie) => movie.Title === title)}
                        moviedata={moviedata}
                        user={user}
                        favMovies={favMovies}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <ProfileView
                  user={user}
                  setUser={setUser}
                  moviedata={moviedata}
                  addFav={addFav}
                  removeFav={removeFav}
                  favMovies={favMovies}
                />
              }
            />
          </Routes>
        </Row>

        {/* {user && (
          <footer className="d-flex justify-content-center align-items-center">
            <button
              onClick={() => {
                localStorage.clear();
                setUser(null);
                setToken(null);
                
              }}
              className="logout-button md-4 mb-3"
              style={{ cursor: "pointer", width: "100px", height: "40px" }}
            >
              Logout
            </button>
          </footer>
        )} */}
      </Container>
    </BrowserRouter>
  );
};
