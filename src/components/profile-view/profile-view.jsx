import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";

export function ProfileView({ user, setUser, moviedata, addFav, removeFav, favMovies }) {
  
const [favoriteMovies, setFavoriteMovies] = useState(favMovies);

useEffect(() => {
  setFavoriteMovies(favMovies);
}, [favMovies]);

if (!user) {
  return null;
}

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {user && (  
              <UserInfo
                fullname={user.FullName}
                username={user.Username}
                email={user.Email}
                birthday={user.Birthday}
              />
              )}
                </Card.Body>
              </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              {/* calling the import from UpdateUser component */}
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>

        <h4>Favorite Movies</h4>
        {favoriteMovies.length > 0 ? (          
        moviedata
          .filter((movie) => favoriteMovies.includes(movie._id))
          .map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard movie={movie} addFav={addFav} removeFav={removeFav} isFav={favoriteMovies.includes(movie._id)}/>
            </Col>
          ))
        ) : (
          <p>There are currently No Movies in your Favorite List</p>
        ) }
      </Row>
    </Container>
  );
}


