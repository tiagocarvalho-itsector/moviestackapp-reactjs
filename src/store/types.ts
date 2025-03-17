export interface StoreState {
  movies: MovieState[];
  setMovies: (movies: MovieState[]) => void;
  addMovie: (movie: MovieState) => void;
  updateMovie: (updatedMovie: MovieState) => void;
  toggleViewed: (id: number) => void;
  deleteMovie: (id: number) => void;
}

export interface MovieState {
  id: number;
  name: string;
  image: string;
  viewed: boolean;
}

export const emptyMovie: MovieState = {
  id: 0,
  name: "",
  image: "",
  viewed: false,
};

export enum Filter {
  ALL = "All",
  SEEN = "Seen",
  NOT_SEEN = "Not Seen",
}
