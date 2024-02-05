import "./movie-card.scss";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFav }) => {
  return (
    <Card className="h-100">
      <Link to={`/moviedata/${movie.Title}`}>
        <Card.Img 
        variant="top" 
        src={movie.ImagePath}
        id="movie-cover" 
        />
      </Link>
      <Card.Body>
        <div className="fav-icon"
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            overflow: 'hidden', // Ensure the borderRadius applies to the background color
            padding: '5px',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'white')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {isFav ? (
            <HeartFill
              size={20}
              color="red"
              onClick={() => removeFav(movie._id)}
            />
          ) : (
            <Heart
              size={20}
              color="red"
              onClick={() => addFav(movie._id)}
            />
          )}
        </div>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Title>{movie.Year}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Link to={`/moviedata/${movie.Title}`} className="open-button">
          Open
        </Link>
      </Card.Footer>
    </Card>
  );
};

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
