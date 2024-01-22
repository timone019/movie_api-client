import "./movie-card.scss";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFav }) => {
  return (
    
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <div>
        {isFav ? (
          <BookmarkHeartFill size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movie._id)}/>
          ) : (
              <BookmarkHeart size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movie._id)}/>
          )}
        </div>
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
