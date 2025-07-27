import {
  mock_movie_one,
  mock_movie_two
} from './movie';

export const moviesResponse = {
  dates: {
    "maximum": "2025-07-30",
    "minimum": "2025-06-18"
  },
  page: 1,
  results: [mock_movie_one, mock_movie_two],
  total_pages: 211,
  total_results: 4203
};
