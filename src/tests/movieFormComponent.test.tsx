import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { emptyMovie, MovieState } from "../store/types";
import { MovieForm } from "../screens/components/movieFormComponent";

describe("<MovieForm />", () => {
  //ARRANGE
  const mockOnHide = jest.fn();
  const mockAddMovie = jest.fn();
  const mockUpdateMovie = jest.fn();

  jest.mock("@store/store", () => ({
    useMovieStore: () => ({
      addMovie: mockAddMovie,
      updateMovie: mockUpdateMovie,
    }),
  }));

  jest.mock("../screens/components/movieFormComponent.tsx", () => ({
    isFormValid: jest.fn(() => false),
  }));

  const defaultMovie: MovieState = {
    id: 1,
    name: "Test Movie",
    image: "https://www.images.com/testMovie.jpg",
    viewed: false,
  };

  test("should render screen with Add New Movie title when isEdit is false", (): void => {
    //ARRANGE + ACT
    render(
      <MovieForm
        isEdit={false}
        show={true}
        onHide={mockOnHide}
        movie={emptyMovie}
      />
    );

    //ASSERT
    expect(screen.getByTestId("formTitle")).toHaveTextContent("Add New Movie");
  });

  test("should render screen with Edit Movie title when isEdit is true", (): void => {
    //ARRANGE + ACT
    render(
      <MovieForm
        isEdit={true}
        show={true}
        onHide={mockOnHide}
        movie={defaultMovie}
      />
    );

    //ASSERT
    expect(screen.getByTestId("formTitle")).toHaveTextContent("Edit Movie");
  });

  test("should disable submit button while all fields are not filled", (): void => {
    //ARRANGE + ACT
    render(
      <MovieForm
        isEdit={true}
        show={true}
        onHide={mockOnHide}
        movie={{ ...defaultMovie, name: "" }}
      />
    );

    //ASSERT
    expect(screen.getByTestId("formSubmitButton")).toBeDisabled();
  });

  test("should enable submit button when all fields are filled", () => {
    //ARRANGE + ACT
    render(
      <MovieForm
        isEdit={true}
        show={true}
        onHide={mockOnHide}
        movie={defaultMovie}
      />
    );

    //ASSERT
    expect(screen.getByTestId("formSubmitButton")).toBeEnabled();
  });

  test("should not add/edit movie if form is not valid", () => {
    //ARRANGE + ACT
    render(
      <MovieForm
        isEdit={false}
        show={true}
        onHide={mockOnHide}
        movie={emptyMovie}
      />
    );

    //ACT
    const button = screen.getByTestId("formSubmitButton");
    button.removeAttribute("disabled");
    fireEvent.click(button);

    //ASSERT
    expect(mockAddMovie).not.toHaveBeenCalled();
    expect(mockUpdateMovie).not.toHaveBeenCalled();
  });

  test("should allow name and image URL edit", () => {
    //ARRANGE
    render(
      <MovieForm
        isEdit={true}
        show={true}
        onHide={mockOnHide}
        movie={defaultMovie}
      />
    );

    //ACT
    const name = screen.getByTestId("formNameInput") as HTMLInputElement;
    fireEvent.change(name, { target: { value: "Another Test Movie" } });
    fireEvent.click(screen.getByTestId("formSubmitButton"));

    //ASSERT
    expect(name.value).toBe("Another Test Movie");
  });

  test("should close modal when clicking close button", () => {
    //ARRANGE
    render(
      <MovieForm
        isEdit={true}
        show={true}
        onHide={mockOnHide}
        movie={defaultMovie}
      />
    );

    //ACT
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    //ASSERT
    expect(mockOnHide).toHaveBeenCalled();
  });

  test("should clear form before closing modal when clicking close button if isEdit is false", () => {
    //ARRANGE
    render(
      <MovieForm
        isEdit={false}
        show={true}
        onHide={mockOnHide}
        movie={defaultMovie}
      />
    );

    //ACT
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    //ASSERT
    expect(mockOnHide).toHaveBeenCalled();
    expect(screen.getByTestId("formNameInput")).toBeEmptyDOMElement();
    expect(screen.getByTestId("formImageInput")).toBeEmptyDOMElement();
  });
});
