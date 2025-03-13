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
