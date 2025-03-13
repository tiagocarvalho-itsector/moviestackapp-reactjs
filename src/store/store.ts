import { create } from "zustand";
import { StoreState } from "./types";

export const useMovieStore = create<StoreState>((set) => ({
  movies: [],

  addMovie: (movie) => set((state) => ({ movies: [...state.movies, movie] })),

  updateMovie: (updatedMovie) =>
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
}));
