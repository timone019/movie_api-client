import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import "./profile-view.scss";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";
import FavoriteMovies from "./favorite-movies";


export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    FavoriteMovies: [],
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    let isMounted = false;
    // You should add some code here to fetch user data or perform other side effects
  }, []); // Don't forget to add a dependency array

  const getUser = () => {
    fetch(`https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          Username: data.Username,
          Email: data.Email,
          FavoriteMovies: data.FavoriteMovies,
        });
      })
      .catch((e) => {
        console.error("Error:", e);
      });
  };

  const favoriteMoviesList = movies.filter((m) => user.FavoriteMovies.includes(m._id));

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatedUserInfo(user);
    console.log(user);
    alert("User data updated successfully");
    window.location.reload();
    UpdateUser();
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        "https://mymovies-8b73c95d0ae4.herokuapp.com/users/${user.Username}",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log("User updated successfully:", updatedUserData);
        alert("User updated successfully!");
        window.location.href = "/dashboard";
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const removeFav = (movieId) => {
    const updatedList = user.FavoriteMovies.filter((id) => id !== movieId);
    setUser({ ...user, FavoriteMovies: updatedList });
    console.log(updatedList);
  };

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />

      <div>
        <h2>Favorite Movies</h2>
        {favoriteMoviesList.map((movie) => (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt={movie.Title} />
            <Link to={`/moviedata/${movie._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(movie._id)}>
              Remove from list
            </Button>
          </div>
        ))}
        <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Want to change some info?</h2>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              defaultValue={user.Username}
              onChange={(e) => handleUpdate(e)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              defaultValue={user.Password}
              onChange={(e) => handleUpdate(e)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={user.Email}
              onChange={(e) => handleUpdate(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default ProfileView;