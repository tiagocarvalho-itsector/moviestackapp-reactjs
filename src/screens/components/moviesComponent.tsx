import React, { useState } from "react";
import { useMovieStore } from "../../store/store";
import { Filter, Filters, MovieState } from "../../store/types";
import { MovieList } from "./movieListComponent";
import { Button } from "react-bootstrap";
import { MovieForm } from "./movieFormComponent";

const emptyMovie: MovieState = {
  id: 0,
  name: "",
  image: "",
  viewed: false,
};

export const Movies: React.FC = () => {
  const { movies, addMovie, updateMovie } = useMovieStore();
  const [movie, setMovie] = useState<MovieState>(emptyMovie);

  const [filter, setFilter] = useState<Filter>(Filters.ALL);

  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [refreshMoviesTrigger, setRefreshMoviesTrigger] = useState(false);

  function toggleMovieFormModal(): void {
    if (showMovieFormModal) setMovie(emptyMovie);
    setShowMovieFormModal(!showMovieFormModal);
  }

  function handleFilterChange(newFilter: Filter) {
    setFilter(newFilter);
  }

  function clearMovieEntries() {
    setMovie(emptyMovie);
  }

  function handleAddMovie(): void {
    addMovie(movie);
    clearMovieEntries();
  }

  function handleUpdateMovie(movie: MovieState): void {
    updateMovie(movie);
    clearMovieEntries();
  }

  function handleToggleViewed(movie: MovieState): void {
    movie.viewed = !movie.viewed;
    handleUpdateMovie(movie);
  }

  return (
    <>
      <MovieForm
        movie={movie}
        isEdit={movie !== emptyMovie ? true : false}
        show={showMovieFormModal}
        onHide={toggleMovieFormModal}
        refreshMoviesTrigger={refreshMoviesTrigger}
        setRefreshMoviesTrigger={setRefreshMoviesTrigger}
        onAddMovie={handleAddMovie}
        onUpdateMovie={handleUpdateMovie}
      />
      <MovieList
        movies={movies}
        onUpdateMovie={toggleMovieFormModal}
        onToggleViewed={handleToggleViewed}
      />
      <Button onClick={toggleMovieFormModal}>Add New Movie</Button>
    </>
  );
};
