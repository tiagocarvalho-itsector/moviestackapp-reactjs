import { MovieList } from "@components/movieListComponent";
import { useMovieStore } from "@store/store";
import { MovieState } from "@store/types";
import { render, screen, fireEvent, act } from "@testing-library/react";

const mockMovies = [
  { id: 1, name: "Movie 1", image: "image1", viewed: false },
  { id: 2, name: "Movie 2", image: "image2", viewed: true },
  { id: 3, name: "Movie 3", image: "image3", viewed: false },
  { id: 4, name: "Movie 4", image: "image4", viewed: true },
  { id: 5, name: "Movie 5", image: "image5", viewed: false },
] as MovieState[];

describe("MovieList", () => {
  beforeEach(() => {
    act(() => {
      useMovieStore.getState().setMovies(mockMovies);
    });
  });

  const mockOnUpdateMovie = jest.fn();

  it("should render first three movies", async () => {
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  it("should filter movies by 'ALL' status", async () => {
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const filterButton = screen.getByTestId("dropdown-toggle");
    fireEvent.click(filterButton);

    const filterOption = screen.getByTestId("dropdown-all");
    fireEvent.click(filterOption);

    expect(useMovieStore).toHaveBeenCalled();
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  it("should filter movies by 'SEEN' status", async () => {
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const filterButton = screen.getByTestId("dropdown-toggle");
    fireEvent.click(filterButton);

    const filterOption = screen.getByTestId("dropdown-seen");
    fireEvent.click(filterOption);

    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  it("should filter movies by 'NOT_SEEN' status", async () => {
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const filterButton = screen.getByTestId("dropdown-toggle");
    fireEvent.click(filterButton);

    const filterOption = screen.getByTestId("dropdown-not-seen");
    fireEvent.click(filterOption);

    expect(screen.queryByText("Movie 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 3")).not.toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("should update filter in localStorage", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const filterButton = screen.getByTestId("dropdown-toggle");
    fireEvent.click(filterButton);

    const filterOption = screen.getByTestId("dropdown-seen");
    fireEvent.click(filterOption);

    expect(setItemSpy).toHaveBeenCalledWith("filter", "Seen");
  });

  it("should handle pagination next and previous buttons", async () => {
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const prevButton = screen.getByText("◀");
    const nextButton = screen.getByText("▶");

    expect(prevButton).toBeDisabled();

    fireEvent.click(nextButton);

    expect(screen.getByText("Movie 4")).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  it("should disable next button when no more movies", async () => {
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const nextButton = screen.getByText("▶");

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
});
