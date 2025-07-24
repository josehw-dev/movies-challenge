/**
 * Represents a range of dates typically used in paginated movie list responses.
 */
export type Dates = {
  /** Latest date in the results range (e.g., latest release date). */
  maximum: Date;

  /** Earliest date in the results range. */
  minimum: Date;
};

/**
 * Represents a single movie object returned by the API.
 */
export type Movie = {
  /** Whether the movie is marked as adult content. */
  adult: boolean;

  /** Path to the backdrop image. */
  backdrop_path: string;

  /** List of genre IDs associated with the movie. */
  genre_ids: number[];

  /** Unique identifier for the movie. */
  id: number;

  /** Original language code (e.g., 'en', 'es'). */
  original_language: string;

  /** Original title of the movie. */
  original_title: string;

  /** Movie synopsis or description. */
  overview: string;

  /** Popularity score of the movie. */
  popularity: number;

  /** Path to the movie poster image. */
  poster_path: string;

  /** Official release date of the movie. */
  release_date: Date;

  /** Localized title of the movie. */
  title: string;

  /** Whether the movie has an associated video (e.g., trailer). */
  video: boolean;

  /** Average user rating (0–10 scale). */
  vote_average: number;

  /** Total number of votes received. */
  vote_count: number;
};

/**
 * Represents the full API response when fetching a list of movies.
 */
export type MovieListResponse = {
  /** Date range for the current set of results. */
  dates: Dates;

  /** Current page of the result set. */
  page: number;

  /** Array of movies returned for this page. */
  results: Movie[];

  /** Total number of pages available. */
  total_pages: number;

  /** Total number of movies found. */
  total_results: number;
};
