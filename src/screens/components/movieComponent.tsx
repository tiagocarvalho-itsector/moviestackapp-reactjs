import { Button, Card, Form } from "react-bootstrap";
import { MovieState } from "../../store/types";
import { useMovieStore } from "../../store/store";

interface MovieProps {
  movie: MovieState;
  onUpdateMovie(movie: MovieState): void;
}

export const Movie: React.FC<MovieProps> = ({ movie, onUpdateMovie }) => {
  const { toggleViewed, deleteMovie } = useMovieStore();

  function handleToggleViewed() {
    toggleViewed(movie.id);
  }

  function handleEditButtonClick() {
    onUpdateMovie(movie);
  }

  function handleDeleteButtonClick() {
    deleteMovie(movie.id);
  }

  return (
    <Card className="align-items-center">
      <Card.Img
        data-testid="image"
        src={movie.image}
        alt="Invalid image"
        style={{ width: "250px", height: "250px" }}
      />
      <Card.Body className="text-center">
        <Card.Title data-testid="name">{movie.name}</Card.Title>
        <Form.Check
          data-testid="checkbox"
          type="checkbox"
          label={movie.viewed ? "Mark as Not Seen" : "Mark as Seen"}
          checked={movie.viewed}
          onChange={handleToggleViewed}
          className="form-check-inline"
        />
        <br />
        <div className="d-flex gap-1 justify-content-center">
          <Button
            data-testid="edit"
            variant="primary"
            className="mt-2"
            onClick={handleEditButtonClick}
          >
            Edit
          </Button>
          <Button
            data-testid="delete"
            variant="danger"
            className="mt-2"
            onClick={handleDeleteButtonClick}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
