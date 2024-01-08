import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

  // Here is where we define all the props constraints for the movie-card
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
   
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};