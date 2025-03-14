import { create } from "zustand";
import { MovieState, StoreState } from "./types";

export const useMovieStore = create<StoreState>((set) => ({
  movies: [],

  addMovie: (movie: MovieState) =>
    set((state) => ({ movies: [...state.movies, movie] })),

  updateMovie: (updatedMovie: MovieState) =>
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === updatedMovie.id
          ? {
              ...movie,
              name: updatedMovie.name,
              image: updatedMovie.image,
              viewed: updatedMovie.viewed,
            }
          : movie
      ),
    })),

  toggleViewed: (id: number) =>
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              viewed: !movie.viewed,
            }
          : movie
      ),
    })),
}));
