import { create } from "zustand";
import { MovieState, StoreState } from "./types";

export const useMovieStore = create<StoreState>((set) => ({
  movies: [
    {
      id: 1,
      name: "The Greatest Showman",
      image:
        "https://th.bing.com/th/id/OIP.dfygen1JWkHIAW9tJTAI_gHaI-?rs=1&pid=ImgDetMain",
      viewed: false,
    },
    {
      id: 2,
      name: "Avatar",
      image:
        "https://s2.glbimg.com/T4CRp2Bwz6QyXh-3IfI-XzHjgvk=/e.glbimg.com/og/ed/f/original/2022/08/23/fa27tr6usaaajx1.jpg",
      viewed: true,
    },
    {
      id: 3,
      name: "Top Gun Maverick",
      image:
        "https://th.bing.com/th/id/OIP.bKBNbMgYUyWHCPk497JhvAHaK-?rs=1&pid=ImgDetMain",
      viewed: false,
    },
    {
      id: 4,
      name: "Now You See Me 2",
      image:
        "https://th.bing.com/th/id/R.0832b30f79cda15ef17c4110e9404fbc?rik=BYT8UER0ZNvrHA&pid=ImgRaw&r=0",
      viewed: true,
    },
  ],

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
