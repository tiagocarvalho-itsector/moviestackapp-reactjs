import React, { useEffect, useState } from "react";
import { Container, Button, Dropdown, Spinner } from "react-bootstrap";
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

  const localStorageFilter = localStorage.getItem("filter");
  const [filter, setFilter] = useState<Filter>(
    (localStorageFilter as Filter) ?? Filter.ALL
  );

  const [filteredMovies, setFilteredMovies] = useState<MovieState[]>(movies);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem("filter", filter.toString());

    const filtered = movies.filter((movie) => {
      switch (filter) {
        case Filter.SEEN:
          return movie.viewed;
        case Filter.NOT_SEEN:
          return !movie.viewed;
        default:
          return true;
      }
    });

    setFilteredMovies(filtered);
    setLoading(false);
  }, [filter, movies]);

  function handleFilterChange(newFilter: string | null): void {
    setFilter(newFilter ? (newFilter as Filter) : Filter.ALL);
    newFilter === Filter.ALL || newFilter === null
      ? window.history.pushState({}, "", "/")
      : window.history.pushState(
          {},
          "",
          `/${newFilter.toLowerCase().replace(/\s+/g, "-")}`
        );
  }

  function handlePrev(): void {
    setStartIndex(Math.max(startIndex - visibleCount, 0));
  }

  function handleNext(): void {
    setStartIndex(
      Math.min(startIndex + visibleCount, filteredMovies.length - visibleCount)
    );
  }

  const visibleMovies = filteredMovies.slice(
    startIndex,
    startIndex + visibleCount
  );

  return loading ? (
    <div className="spinner-overlay d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  ) : (
    <>
      <Dropdown onSelect={handleFilterChange}>
        <Dropdown.Toggle variant="dark" className="mt-2">
          Filter By Viewing Status: <b>{filter}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(Filter).map((filter, index) => (
            <Dropdown.Item key={index} eventKey={filter}>
              {filter}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Container className="movie-carousel d-flex flex-column align-items-center">
        <div className="d-flex align-items-center justify-content-center">
          <div className="movie-cards-wrapper d-flex align-items-center">
            <Button
              variant="dark"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              ◀
            </Button>

            {visibleMovies.map((movie: MovieState) => (
              <Movie
                key={movie.id}
                movie={movie}
                onUpdateMovie={onUpdateMovie}
              />
            ))}

            <Button
              variant="dark"
              onClick={handleNext}
              disabled={startIndex + visibleCount >= filteredMovies.length}
            >
              ▶
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
