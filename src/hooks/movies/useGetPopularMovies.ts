import { useQuery } from '@tanstack/react-query';

import queries from '../../constants/queries';
import api from '../../utils/api';

import { MovieListResponse } from '../../models/movies';
/**
 * Fetches the list of currently playing movies from the API.
 *
 * @returns {Promise<Movie[]>} A promise that resolves to an array of Movie objects.
 */
const getMovies = async () => {
  const response = await api.get<MovieListResponse>('/movie/popular?language=en-US&page=1');
  return response.data?.results;
}

/**
 * Custom hook to fetch a list of "popular" movies using React Query.
 *
 * @returns {UseQueryResult<Movie[], Error>} React Query result object containing the movie list, loading state, and error (if any).
 */
const useGetPopularMovies = () => {
  return useQuery({
    queryKey: [queries.getMoviesPopular],
    queryFn: getMovies
  });
};

export default useGetPopularMovies;
