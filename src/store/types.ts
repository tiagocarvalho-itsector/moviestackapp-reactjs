export interface StoreState {
  movies: MovieState[];
  addMovie: (movie: MovieState) => void;
  updateMovie: (updatedMovie: MovieState) => void;
  toggleViewed: (id: number) => void;
}

export interface MovieState {
  id: number;
  name: string;
  image: string;
  viewed: boolean;
}

export enum Filter {
  ALL = "All",
  SEEN = "Seen",
  FOR_SEEN = "For Seen",
}
