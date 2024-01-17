import "./movie-card.scss";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
      <Card.Footer>
      <Link to={`/moviedata/${movie.Title}`} className="open-button">
        Open 
      </Link>
      </Card.Footer>
    </Card>
  );
};

// Here is where we define all the props constraints for the movie-card
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
};
