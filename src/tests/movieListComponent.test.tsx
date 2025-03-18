import { MovieList } from "@components/movieListComponent";
import { useMovieStore } from "@store/store";
import { MovieState } from "@store/types";
import { render, screen, fireEvent, act } from "@testing-library/react";

//ARRANGE
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

  it("should render first three movies", () => {
    //ARRANGE + ACT
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    //ASSERT
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  it("should filter movies by 'ALL' status", () => {
    //ARRANGE
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    //ACT
    const filterButton = screen.getByTestId("dropdown-toggle");
    act(() => {
      fireEvent.click(filterButton);
    });

    const filterOption = screen.getByTestId("dropdown-all");
    act(() => {
      fireEvent.click(filterOption);
    });

    //ASSERT
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  it("should filter movies by 'SEEN' status", () => {
    //ARRANGE
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    //ACT
    const filterButton = screen.getByTestId("dropdown-toggle");
    act(() => {
      fireEvent.click(filterButton);
    });

    const filterOption = screen.getByTestId("dropdown-seen");
    act(() => {
      fireEvent.click(filterOption);
    });

    //ASSERT
    expect(screen.queryByText("Movie 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 5")).not.toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 4")).toBeInTheDocument();
  });

  it("should filter movies by 'NOT_SEEN' status", () => {
    //ARRANGE
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    //ACT
    const filterButton = screen.getByTestId("dropdown-toggle");
    fireEvent.click(filterButton);

    const filterOption = screen.getByTestId("dropdown-not-seen");
    fireEvent.click(filterOption);

    //ASSERT
    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 4")).not.toBeInTheDocument();
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
    expect(screen.getByText("Movie 5")).toBeInTheDocument();
  });

  it("should update filter in localStorage", () => {
    //ARRANGE
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    //ACT
    const filterButton = screen.getByTestId("dropdown-toggle");
    fireEvent.click(filterButton);

    const filterOption = screen.getByTestId("dropdown-seen");
    fireEvent.click(filterOption);

    //ASSERT
    expect(setItemSpy).toHaveBeenCalledWith("filter", "Seen");
  });

  it("should handle pagination previous button", async () => {
    //ARRANGE
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const prevButton = screen.getByTestId("prevButton");
    const nextButton = screen.getByTestId("nextButton");

    // ACT
    const filterButton = screen.getByTestId("dropdown-toggle");
    act(() => {
      fireEvent.click(filterButton);
    });

    const filterOption = screen.getByTestId("dropdown-all");
    act(() => {
      fireEvent.click(filterOption);
    });

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    // ASSERT
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  it("should handle pagination next button", () => {
    //ARRANGE
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    const nextButton = screen.getByTestId("nextButton");

    //ACT
    fireEvent.click(nextButton);

    //ASSERT
    expect(screen.getByText("Movie 4")).toBeInTheDocument();
  });

  it("should disable next button when no more movies", () => {
    //ARRANGE
    render(<MovieList onUpdateMovie={mockOnUpdateMovie} />);

    //ACT
    const nextButton = screen.getByText("▶");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    //ASSERT
    expect(nextButton).toBeDisabled();
  });
});
