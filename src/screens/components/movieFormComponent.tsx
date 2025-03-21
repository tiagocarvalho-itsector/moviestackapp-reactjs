import { Button, Form, Modal } from "react-bootstrap";
import { emptyMovie, MovieState } from "../../store/types";
import { useEffect, useState } from "react";
import { useMovieStore } from "../../store/store";

interface MovieFormProps {
  movie: MovieState;
  isEdit: boolean;
  show: boolean;
  onHide(): void;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  isEdit,
  show,
  onHide,
}) => {
  const { addMovie, updateMovie } = useMovieStore();
  const [formMovie, setFormMovie] = useState<MovieState>(movie);

  useEffect(() => {
    setFormMovie(movie);
  }, [movie]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormMovie({
      ...formMovie,
      [e.target.name]: e.target.value,
    });
  }

  function handleClose(): void {
    if (!isEdit) setFormMovie(emptyMovie);
    onHide();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!isFormValid(formMovie)) return;
    isEdit ? updateMovie(formMovie) : addMovie(formMovie);
    handleClose();
  }

  function isFormValid(movie: MovieState) {
    return movie.name.trim() !== "" && movie.image.trim() !== "";
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title data-testid={"formTitle"}>
            {isEdit ? "Edit" : "Add New"} Movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                data-testid="formNameInput"
                required={true}
                type="text"
                placeholder="Movie Name"
                name="name"
                value={formMovie.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                data-testid="formImageInput"
                required={true}
                type="url"
                placeholder="Image URL"
                name="image"
                value={formMovie.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              data-testid="formSubmitButton"
              className="mt-3"
              variant={
                isFormValid(formMovie) ? "outline-success" : "outline-secondary"
              }
              type="submit"
              disabled={!isFormValid(formMovie)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
