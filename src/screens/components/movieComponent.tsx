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
    <Card>
      <Card.Img variant="top" src={movie.image} alt="Invalid image" />
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Form.Check
          type="checkbox"
          label="Already Seen"
          checked={movie.viewed}
          onChange={handleToggleViewed}
        />
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
