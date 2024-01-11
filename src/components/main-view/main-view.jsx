import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return (
        <>
        <LoginView 
        onLoggedIn={(user, token) => { 
            setUser(user); 
            setToken(token); 
            }} 
            />
            or
            <SignupView />
            </>
    );
}

useEffect(() => {
  if (!token) {
      return;
  }

  fetch("https://mymovies-8b73c95d0ae4.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => response.json())
  .then((movies) => {
      const moviesFromApi = movies.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: { 
              Name: movie.Genre.Name, 
              Description: movie.Genre,
          },
          Director: { 
              Name: movie.Director.Name, 
              Bio: movie.Director.Bio, 
              Birth: movie.Director.Birth,
          },
          // ImagePath: movie.ImagePath,
          Featured: movie.Featured
      }));

      setMovies(moviesFromApi);
  });
  }, [token]);

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) => movie.Genre.Name === selectedMovie.Genre.Name
    );
    similarMovies = similarMovies.filter(
      (movie) => movie.Title !== selectedMovie.Title
    );
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          alert("Sweet!");
        }}
      >
        Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
        <button 
            onClick={() => {
                setUser(null);
                setToken(null);
            }}
            >
                Log out
                </button>
    </div>
  );
};
