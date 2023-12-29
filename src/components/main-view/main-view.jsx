import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Terminator 2: Judgement Day",
      description: "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son John from an even more advanced and powerful cyborg.",
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71kUIPJEafS._SL1500_.jpg",
      director: "James Cameron",
      genre: "Action"
    },
    {
      id: 2,
      title: "Transformers",
      "Description": "An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.",
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/A1Lw6vNC9DL._SL1500_.jpg",
      director: "Michael Bay",
      genre: "Action"
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      "Description": "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81nKA1flatL._SL1500_.jpg",
      director: "Ryan Coogler",
      genre: "Action"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
