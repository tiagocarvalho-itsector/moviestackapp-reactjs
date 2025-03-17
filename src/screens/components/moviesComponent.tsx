import React, { useState } from "react";
import { MovieList } from "./movieListComponent";
import { Button } from "react-bootstrap";
import { MovieForm } from "./movieFormComponent";
import { emptyMovie, MovieState } from "../../store/types";

export const Movies: React.FC = () => {
  const [movie, setMovie] = useState<MovieState>(emptyMovie);
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);

  function handleEditButtonClick(movieToUpdate: MovieState) {
    setMovie(movieToUpdate);
    setShowMovieFormModal(!showMovieFormModal);
  }

  function toggleMovieFormModal(): void {
    setMovie(emptyMovie);
    setShowMovieFormModal(!showMovieFormModal);
  }

  return (
    <>
      <Button onClick={toggleMovieFormModal}>Add New Movie</Button>
      <MovieList onUpdateMovie={handleEditButtonClick} />
      <MovieForm
        movie={movie}
        isEdit={movie !== emptyMovie ? true : false}
        show={showMovieFormModal}
        onHide={toggleMovieFormModal}
      />
    </>
  );
};
