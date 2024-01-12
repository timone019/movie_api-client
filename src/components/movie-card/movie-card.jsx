import "./movie-card.scss";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <div>
        <Button
        onClick={() => onMovieClick(movie)}
        className="open-button"
        style={{ cursor: "pointer" }} 
        // variant="link"
      >
        Open
        </Button>
        </div>
        </Card.Body>
      </Card>
    );
  };

  // Here is where we define all the props constraints for the movie-card
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};