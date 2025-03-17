import React, { useEffect, useState, useMemo } from "react";
import { Container, Button, Dropdown } from "react-bootstrap";
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
  const [filter, setFilter] = useState<Filter>(
    (localStorage.getItem("filter") as Filter) ?? Filter.ALL
  );

  const filterMovies = (filter: Filter) => {
    switch (filter) {
      case Filter.SEEN:
        return movies.filter((movie) => movie.viewed);
      case Filter.NOT_SEEN:
        return movies.filter((movie) => !movie.viewed);
      default:
        return movies;
    }
  };

  const filteredMovies = useMemo(() => filterMovies(filter), [movies, filter]);

  useEffect(() => {
    localStorage.setItem("filter", filter.toString());
  }, [filter]);

  function handleFilterChange(newFilter: string | null): void {
    const newFilterValue = newFilter ? (newFilter as Filter) : Filter.ALL;
    setFilter(newFilterValue);
    if (newFilterValue === Filter.ALL || newFilterValue === null) {
      window.history.pushState({}, "", "/");
    } else {
      window.history.pushState(
        {},
        "",
        `/${newFilterValue.toLowerCase().replace(/\s+/g, "-")}`
      );
    }
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

  return (
    <>
      <Dropdown data-testid="dropdown" onSelect={handleFilterChange}>
        <Dropdown.Toggle
          data-testid="dropdown-toggle"
          variant="dark"
          className="mt-2"
        >
          Filter By Viewing Status: <b>{filter}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(Filter).map((filterValue, index) => (
            <Dropdown.Item
              data-testid={
                "dropdown-" +
                filterValue
                  .toString()
                  .toLowerCase()
                  .replace(" ", "-")
                  .replace("_", "-")
              }
              key={index}
              eventKey={filterValue}
            >
              {filterValue}
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
