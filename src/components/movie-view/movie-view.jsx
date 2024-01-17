import "./movie-view.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

// import Card from "react-bootstrap/Card";

export const MovieView = ({ token }) => {
  const { title: urlTitle } = useParams();
  const [title, setTitle] = useState(urlTitle); // [title, setTitle]
  // const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  
  // Fetch the movie data based on the movie title
  useEffect(() => {
    setTitle(urlTitle);
  }, [urlTitle]);

  useEffect(() => {
    console.log('title', urlTitle);

    fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/movies/${urlTitle}`, {
      headers: { Authorization: `Bearer ${token}` },
  })
      .then((response) => response.json())
      .then((data) => {
        console.log('response', data);
        setMovie(data);
      
        // Fetch all movies
      fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.json())
      .then((allMovies) => {
        // Filter movies that have the same genre as the current movie
        const similarMovies = allMovies.filter(
          (m) => m.Genre.Name === data.Genre.Name && m._id !== data._id);
        console.log('similarMovies', similarMovies);
        setSimilarMovies(similarMovies);  
      });
      });
  }, [urlTitle, token]);

  if (!movie) return null; 

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
      <br />
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

    <h2>Similar movies</h2>
      <Row>
        {similarMovies.map((movie) => (
          <Col md={3} key={movie._id}>
            <Link to={`/movies/${movie.Title}`}>
              <MovieCard movie={movie} />
            </Link>
          </Col>
        ))}
      </Row>
      <br />
      <Link to={"/"} className="back-button">Back</Link>

    </>
  );
};

MovieView.propTypes = {
 token: PropTypes.string.isRequired,
};