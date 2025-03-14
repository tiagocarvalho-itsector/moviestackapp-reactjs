import { Button, Card, Form } from "react-bootstrap";
import { MovieState } from "../../store/types";

interface MovieProps {
  movie: MovieState;
  onUpdateMovie(movie: MovieState): void;
  onToggleViewed(movie: MovieState): void;
}

export const Movie: React.FC<MovieProps> = ({
  movie,
  onUpdateMovie,
  onToggleViewed,
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.image} alt="Invalid image" />
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Form.Check
          type="checkbox"
          label="Already Seen"
          checked={movie.viewed}
          onChange={() => onToggleViewed(movie)}
        />
        <Button
          variant="primary"
          className="mt-2"
          onClick={() => onUpdateMovie(movie)}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};
