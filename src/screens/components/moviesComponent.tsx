import React, { useState } from "react";
import { useMovieStore } from "../../store/store";
import { MovieState } from "../../store/types";
import { MovieTable } from "./movieTableComponent";

export const Movies: React.FC = () => {
  const { movies, addMovie, updateMovie } = useMovieStore();
  const [movie, setMovie] = useState<MovieState>({
    id: 0,
    name: "",
    image: "",
    viewed: false,
  });

  function clearMovieEntries() {
    setMovie({ id: 0, name: "", image: "", viewed: false });
  }

  function handleAddMovie(): void {
    addMovie(movie);
    clearMovieEntries();
  }

  function handleUpdateMovie(): void {
    updateMovie(movie);
    clearMovieEntries();
  }

  function handleToggleViewed(): void {
    movie.viewed = !movie.viewed;
    handleUpdateMovie();
  }

  return (
    <>
      <MovieTable />
    </>
  );
};
