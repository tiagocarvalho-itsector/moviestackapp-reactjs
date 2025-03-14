import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Movie } from "./movieComponent";
import { Filter, MovieState } from "../../store/types";
import { useMovieStore } from "../../store/store";

const visibleCount = 3;

interface MovieListProps {
  onUpdateMovie(movie: MovieState): void;
}

export const MovieList: React.FC<MovieListProps> = ({ onUpdateMovie }) => {
  const { movies } = useMovieStore();
  const [startIndex, setStartIndex] = useState(0);

  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  function handleFilterChange(newFilter: Filter): void {
    setFilter(newFilter);
  }

  function handlePrev(): void {
    setStartIndex(Math.max(startIndex - visibleCount, 0));
  }

  function handleNext(): void {
    setStartIndex(
      Math.min(startIndex + visibleCount, movies.length - visibleCount)
    );
  }

  const visibleMovies = movies
    .slice(startIndex, startIndex + visibleCount)
    .filter((movie) => {
      switch (filter) {
        case Filter.FOR_SEEN:
          return !movie.viewed;
        case Filter.SEEN:
          return movie.viewed;
        default:
          return true;
      }
    });

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

          {visibleMovies.map((movie: MovieState) => (
            <Movie key={movie.id} movie={movie} onUpdateMovie={onUpdateMovie} />
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
