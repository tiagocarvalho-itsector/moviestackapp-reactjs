import React, { useState } from "react";
import { MovieList } from "./movieListComponent";
import { Button } from "react-bootstrap";
import { MovieForm } from "./movieFormComponent";
import { MovieState } from "../../store/types";

export const Movies: React.FC = () => {
  const [movie, setMovie] = useState<MovieState>({
    id: 0,
    name: "",
    image: "",
    viewed: false,
  });

  const [showMovieFormModal, setShowMovieFormModal] = useState(false);

  function handleEditButtonClick(movieToUpdate: MovieState) {
    setMovie(movieToUpdate);
    toggleMovieFormModal();
  }

  function toggleMovieFormModal(): void {
    setShowMovieFormModal(!showMovieFormModal);
  }

  return (
    <>
      <MovieForm
        movie={movie}
        isEdit={movie ? true : false}
        show={showMovieFormModal}
        onHide={toggleMovieFormModal}
      />
      <MovieList onUpdateMovie={handleEditButtonClick} />
      <Button onClick={toggleMovieFormModal}>Add New Movie</Button>
    </>
  );
};
