import { Button, Form, Modal } from "react-bootstrap";
import { MovieState } from "../../store/types";
import { useEffect, useState } from "react";

interface MovieFormProps {
  movie: MovieState;
  isEdit: boolean;
  show: boolean;
  onHide(): void;
  refreshMoviesTrigger: boolean;
  setRefreshMoviesTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  onAddMovie(movie: MovieState): void;
  onUpdateMovie(movie: MovieState): void;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  isEdit,
  show,
  onHide,
  refreshMoviesTrigger,
  setRefreshMoviesTrigger,
  onAddMovie,
  onUpdateMovie,
}) => {
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!isFormValid(formMovie)) return;
    isEdit ? onUpdateMovie(formMovie) : onAddMovie(formMovie);
    setRefreshMoviesTrigger(!refreshMoviesTrigger);
    onHide();
    clearForm();
  }

  function isFormValid(movie: MovieState) {
    return movie.name.trim() !== "" && movie.image.trim() !== "";
  }

  function clearForm(): void {
    setFormMovie({
      id: 0,
      name: "",
      image: "",
      viewed: false,
    });
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
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
                required={true}
                type="url"
                placeholder="Image URL"
                name="image"
                value={formMovie.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
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
