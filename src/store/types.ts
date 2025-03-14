export interface StoreState {
  movies: MovieState[];
  addMovie: (movie: MovieState) => void;
  updateMovie: (updatedMovie: MovieState) => void;
}

export interface MovieState {
  id: number;
  name: string;
  image: string;
  viewed: boolean;
}

export const Filters = {
  ALL: "All",
  SEEN: "Seen",
  FOR_SEEN: "For Seen",
};

export type Filter = (typeof Filters)[keyof typeof Filters];
