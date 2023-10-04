import { Movie } from "./MovieModal/MovieModal.types";

export type MovieDetails = Movie & {
  name: string;
  original_name: string;
  videos: Videos;
};

interface Videos {
  results: Result[];
}

interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
