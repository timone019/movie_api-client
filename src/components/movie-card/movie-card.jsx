import "./movie-card.scss";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFav }) => {
  return (
    <Card className="h-100">
      <Link to={`/moviedata/${movie.Title}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <div className="fav-icon">
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
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Title>{movie.Year}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Link 
        to={`/moviedata/${movie.Title}`} 
        className="open-button"
        onClick={() => window.scrollTo(0, 0)}
        >
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
    Year: PropTypes.string.isRequired,
  }).isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired,
};
