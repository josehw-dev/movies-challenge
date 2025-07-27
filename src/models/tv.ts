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
 * Represents a single TV show object returned by the API.
 */
export type TV = {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  origin_country:    string[];
  original_language: string;
  original_name:     string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  first_air_date:    Date;
  name:              string;
  vote_average:      number;
  vote_count:        number;
};

/**
 * Represents the full API response when fetching a list of tv shows.
 */
export type TVListResponse = {
  /** Date range for the current set of results. */
  dates: Dates;

  /** Current page of the result set. */
  page: number;

  /** Array of movies returned for this page. */
  results: TV[];

  /** Total number of pages available. */
  total_pages: number;

  /** Total number of movies found. */
  total_results: number;
};