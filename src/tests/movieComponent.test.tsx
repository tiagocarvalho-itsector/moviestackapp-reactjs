import { Movie } from "@components/movieComponent";
import { MovieState } from "@store/types";
import { render, screen, fireEvent } from "@testing-library/react";

const mockToggleViewed = jest.fn();
const mockDeleteMovie = jest.fn();

jest.mock("@store/store", () => ({
  useMovieStore: () => ({
    toggleViewed: mockToggleViewed,
    deleteMovie: mockDeleteMovie,
  }),
}));

const mockMovie: MovieState = {
  id: 1,
  name: "Movie 1",
  image: "https://www.movie-images.com/movie1.jpg",
  viewed: false,
};

describe("<Movie />", () => {
  const mockOnUpdateMovie = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render movie correctly", () => {
    render(<Movie movie={mockMovie} onUpdateMovie={mockOnUpdateMovie} />);

    expect(screen.getByTestId("name")).toHaveTextContent(mockMovie.name);
    expect(screen.getByTestId("image")).toHaveAttribute("src", mockMovie.image);
    expect(screen.getByTestId("edit")).toBeEnabled();
    expect(screen.getByTestId("delete")).toBeEnabled();
  });

  it("should call toggleViewed when checkbox is clicked", () => {
    render(<Movie movie={mockMovie} onUpdateMovie={mockOnUpdateMovie} />);

    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleViewed).toHaveBeenCalledWith(mockMovie.id);
  });

  it("should call onUpdateMovie when edit button is clicked", () => {
    render(<Movie movie={mockMovie} onUpdateMovie={mockOnUpdateMovie} />);

    const editButton = screen.getByTestId("edit");
    fireEvent.click(editButton);

    expect(mockOnUpdateMovie).toHaveBeenCalledWith(mockMovie);
  });

  it("should call deleteMovie when delete button is clicked", () => {
    render(<Movie movie={mockMovie} onUpdateMovie={mockOnUpdateMovie} />);

    const deleteButton = screen.getByTestId("delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteMovie).toHaveBeenCalledWith(mockMovie.id);
  });

  it("should show 'Mark as Seen' if movie is not seen", () => {
    render(<Movie movie={mockMovie} onUpdateMovie={mockOnUpdateMovie} />);

    expect(
      screen.getByTestId("checkbox").nextSibling as HTMLElement
    ).toHaveTextContent("Mark as Seen");
  });

  it("should show 'Mark as Not Seen' if movie is already seen", () => {
    const viewedMovie = { ...mockMovie, viewed: true };
    render(<Movie movie={viewedMovie} onUpdateMovie={mockOnUpdateMovie} />);

    expect(
      screen.getByTestId("checkbox").nextSibling as HTMLElement
    ).toHaveTextContent("Mark as Not Seen");
  });
});
