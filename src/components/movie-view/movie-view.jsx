import "./movie-view.scss";
import PropTypes from "prop-types";
// import Card from "react-bootstrap/Card";

export const MovieView = ({ movie, onBackClick }) => {
  return (
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

      <button
        onClick={onBackClick}
        className="back-button mt-2"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // include other properties of Director if there are any
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // include other properties of Genre if there are any
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
