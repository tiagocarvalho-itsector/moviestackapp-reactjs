import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { MovieState } from "../../store/types";
import { Movie } from "./movieComponent";

interface MovieListProps {
  movies: MovieState[];
  onUpdateMovie(movie: MovieState): void;
  onToggleViewed(movie: MovieState): void;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  onUpdateMovie,
  onToggleViewed,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex(
      Math.min(startIndex + visibleCount, movies.length - visibleCount)
    );
  };

  const visibleMovies = filteredMovies.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <Container className="movie-carousel d-flex flex-column align-items-center">
      <div className="d-flex align-items-center justify-content-center gap-3">
        <div className="movie-cards-wrapper d-flex align-items-center gap-4">
          <Button
            variant="dark"
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="navigation-button"
          >
            ◀
          </Button>

          {visibleMovies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              onUpdateMovie={onUpdateMovie}
              onToggleViewed={onToggleViewed}
            />
          ))}

          <Button
            variant="dark"
            onClick={handleNext}
            disabled={startIndex + visibleCount >= movies.length}
            className="navigation-button"
          >
            ▶
          </Button>
        </div>
      </div>
    </Container>
  );
};
