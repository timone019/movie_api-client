import "./movie-view.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const { title: urlTitle } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const movie = moviedata.find((m) => m.Title === urlTitle);
    setMovie(movie);

    if (movie) {
      const similarMovies = moviedata.filter(
        (m) => m.Genre.Name === movie.Genre.Name && m._id !== movie._id
      );
      setSimilarMovies(similarMovies);
      setIsFav(user.FavoriteMovies.includes(movie._id));
    }
  }, [urlTitle, moviedata, user]);

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
            <div className="fav-icon">
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
                <h3>{movie.Year} - {movie.Rating} - {movie.Runtime}</h3>
              </span>
            </div>
            <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '600px', margin: '0 auto'}}>
              <span>
                <iframe
                  src={movie.TrailerPath.replace("watch?v=", "embed/")}
                  title="Movie Trailer"
                  className="trailer-button"
                  allowFullScreen
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                 
                >
                </iframe>
              </span>
            </div>
            <h4>Watch Trailer</h4>
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
          <Container className="mb-3">
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
          {/* <br />
          <Link to={"/"} className="back-button">
            Home
          </Link> */}
        </div>
      )}
    </>
  );
};
MovieView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  favMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  moviedata: PropTypes.array.isRequired,
};
