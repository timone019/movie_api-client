import React, { useState } from 'react';
import { Card, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const FavoriteMovies = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Movie 1', genre: 'Action' },
    { id: 2, title: 'Movie 2', genre: 'Comedy' },
    // Add more movies as needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState({ title: '', genre: '' });

  const handleCloseModal = () => {
    setShowModal(false);
    setNewMovie({ title: '', genre: '' });
  };

  const handleAddMovie = () => {
    setMovies([...movies, { id: movies.length + 1, ...newMovie }]);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const removeFav = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };


  return (
    <>
      <Row>
      <Col>
       <h2>Favorite Movies</h2>
       </Col>
       </Row>
       <Row>
       {movies.map((movie) => {
          return (
            <Col xs={12} sm={4} md={3} key={movie._id}>
              <img src={movie.ImagePath} />
              <Link to={`/moviedata/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
              <button variant="secondary" onClick={() => removeFav(movie._id)}>
                Remove from list
              </button>
            </Col>
          )
       })
      }
        </Row>
        </>
          )
        }

        

//         <>
//         <div className="mt-3">
//   {movies.map((movie) => (
//     <Card key={movie.id} style={{ width: '18rem' }} className="mb-3">
//       <Card.Body>
//         <Card.Title>{movie.title}</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">{movie.genre}</Card.Subtitle>
//       </Card.Body>
//     </Card>
//   ))}
// </div><Modal show={showModal} onHide={handleCloseModal}>
//     <Modal.Header closeButton>
//       <Modal.Title>Add New Movie</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <Form>
//         <Form.Group controlId="formTitle">
//           <Form.Label>Title:</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter title"
//             name="title"
//             value={newMovie.title}
//             onChange={handleInputChange} />
//         </Form.Group>

//         <Form.Group controlId="formGenre">
//           <Form.Label>Genre:</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter genre"
//             name="genre"
//             value={newMovie.genre}
//             onChange={handleInputChange} />
//         </Form.Group>
//       </Form>
//     </Modal.Body>
//   </Modal></>
    

    export default FavoriteMovies;