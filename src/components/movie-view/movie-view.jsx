// import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie._id} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.Director.Bio}</span>
      <div>
        <span>Director Birth: </span>
        <span>{movie.Director.Birth}</span>
      </div>
      </div>
      <div>
      <span>Genre: </span>
      <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.Genre.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    // image: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }) .isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    // Add more PropTypes for other movie properties if needed
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
