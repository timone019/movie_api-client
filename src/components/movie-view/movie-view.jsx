import "./movie-view.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Heart, HeartFill } from "react-bootstrap-icons";

export const MovieView = ({
  user,
  addFav,
  removeFav,
  favMovies,
  moviedata,
}) => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const movie = moviedata.find((m) => m.Title === title);
    setMovie(movie);

    if (movie) {
      const similarMovies = moviedata.filter(
        (m) => m.Genre.Name === movie.Genre.Name && m._id !== movie._id
      );
      setSimilarMovies(similarMovies);
      setIsFav(user.FavoriteMovies.includes(movie._id));
    }
  }, [title, moviedata, user]);

  const handleAddFav = (movieId) => {
    addFav(movieId);
    setIsFav(true);
  };

  const handleRemoveFav = (movieId) => {
    removeFav(movieId);
    setIsFav(false);
  };

  return (
    <>
      {movie && (
        <div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className="w-100"
                src={movie.ImagePath}
                alt={movie.Title}
                style={{ maxWidth: "600px" }}
              />
            </div>
            <div>
              {isFav ? (
                <HeartFill
                  size={20}
                  color="red"
                  className="fav-button mt-2 me-2 top-0 end-0"
                  onClick={() => handleRemoveFav(movie._id)}
                />
              ) : (
                <Heart
                  size={20}
                  color="red"
                  className="fav-button mt-2 me-2 top-0 end-0"
                  onClick={() => handleAddFav(movie._id)}
                />
              )}
            </div>

            <div>
              <span>
                <h1>{movie.Title}</h1>
              </span>
            </div>
            <div>
              <span>
                <h1>{movie.Year}</h1>
              </span>
            </div>
            <div>
              <span>
                <a
                  href={movie.TrailerPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-button"
                >
                  Watch Trailer
                </a>
              </span>
            </div>
            <div className="mt-3">
              <span>Director: </span>
              <span>{movie.Director.Name}</span>
            </div>
            <div>
              <span>Genre: </span>
              <span>{movie.Genre.Name}</span>
            </div>
          
            <div className="mt-3">
              <p style={{ maxWidth: "800px", margin: "0 auto" }}>
                <span>{movie.Description}</span>
              </p>
            </div>
          </div>

          <br />
          <h2>Similar movies</h2>
          <Container>
            <Row>
              {similarMovies.map((movie) => (
                <Col
                  md={3}
                  key={`${movie._id}-${isFav}`}
                  className="movie-card"
                >
                  <MovieCard
                    movie={movie}
                    addFav={addFav}
                    removeFav={removeFav}
                    isFav={favMovies.includes(movie._id)}
                  />
                </Col>
              ))}
            </Row>
          </Container>
          <br />
          <Link to={"/"} className="back-button">
            Home
          </Link>
        </div>
      )}
    </>
  );
};
MovieView.propTypes = {
  // token: PropTypes.string.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  // isFav: PropTypes.bool.isRequired,
  moviedata: PropTypes.array.isRequired,
};
