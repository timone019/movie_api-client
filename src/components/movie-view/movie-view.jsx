import "./movie-view.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Heart, HeartFill } from "react-bootstrap-icons";

export const MovieView = ({ token, addFav, removeFav, isFav }) => {
  const { title: urlTitle } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    // console.log('title', urlTitle);

    fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/movies/${urlTitle}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);
        setMovie(data);

        // Fetch all movies
        fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((allMovies) => {
            // Filter movies that have the same genre as the current movie
            const similarMovies = allMovies.filter(
              (m) => m.Genre.Name === data.Genre.Name && m._id !== data._id
            );
            // console.log('similarMovies', similarMovies);
            setSimilarMovies(similarMovies);
          });
      });
  }, [urlTitle, token]);

  if (!movie) return null;

  // className="justify-content-md-center"

  return (
    <>
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
              onClick={() => removeFav(movie._id)}
            />
          ) : (
            <Heart
              size={20}
              color="red"
              className="fav-button mt-2 me-2 top-0 end-0"
              onClick={() => addFav(movie._id)}
            />
          )}
        </div>

        <div>
          <span>
            <h1>{movie.Title}</h1>
          </span>
        </div>
        <div mt-3>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <br />
        <div>
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
            <Col md={3} key={movie._id} className="movie-card">
              {/* <Link to={`/movies/${movie.Title}`}> */}
              <MovieCard movie={movie} />
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <Link to={"/"} className="back-button">
        Home
      </Link>
    </>
  );
};

MovieView.propTypes = {
  token: PropTypes.string.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired,
};
