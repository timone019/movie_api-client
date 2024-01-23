import { Card, Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";

export function ProfileView({ user, setUser, moviedata, setMoviedata }) {
  console.log(user);

  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [birthday, setBirthday] = useState("");
  // Navigate

  // return list of favorite movies
  // const favoriteMovieList = user.FavoriteMovies.map((favoriteMovie) =>
  //   movies?.find((movie) => movie._id === favoriteMovie)
  // );

  // const data = {
  //   Name: name,
  //   Username: username,
  //   Password: password,
  //   Email: email,
  //   Birthday: birthday,
  // };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {user && (  
              <UserInfo
                username={user.Username}
                email={user.Email}
                birthday={user.Birthday}
              />
              )}
                  {/* <Card.Title>Current Profile Info</Card.Title> */}
                  {/* <Card.Text>Username: {user.Username}</Card.Text>
                  <Card.Text>Email: {user.Email}</Card.Text>
                  <Card.Text>Birthday: {user.Birthday}</Card.Text> */}
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
        {moviedata
          .filter((movie) => user.FavoriteMovies.includes(movie._id))
          .map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}

        {/* <FavoriteMovies
                favoriteMovieList={favoriteMovieList}
                removeFavorite={removeFavorite}
              /> */}
      </Row>
    </Container>
  );
}

// export default ProfileView;
