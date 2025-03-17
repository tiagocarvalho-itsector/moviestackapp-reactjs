import { Button, Card, Form } from "react-bootstrap";
import { MovieState } from "../../store/types";
import { useMovieStore } from "../../store/store";

interface MovieProps {
  movie: MovieState;
  onUpdateMovie(movie: MovieState): void;
}

export const Movie: React.FC<MovieProps> = ({ movie, onUpdateMovie }) => {
  const { toggleViewed } = useMovieStore();

  function handleToggleViewed() {
    toggleViewed(movie.id);
  }

  function handleEditButtonClick() {
    onUpdateMovie(movie);
  }

  return (
    <Card className="align-items-center">
      <Card.Img
        src={movie.image}
        alt="Invalid image"
        style={{ width: "250px", height: "250px" }}
      />
      <Card.Body className="text-center">
        <Card.Title>{movie.name}</Card.Title>
        <Form.Check
          type="checkbox"
          label={movie.viewed ? "Mark as Not Seen" : "Mark as Seen"}
          checked={movie.viewed}
          onChange={handleToggleViewed}
          className="form-check-inline"
        />
        <br />
        <Button
          variant="primary"
          className="mt-2"
          onClick={handleEditButtonClick}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};
