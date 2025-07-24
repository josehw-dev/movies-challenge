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
  const response = await api.get<MovieListResponse>('/movie/now_playing?language=en-US&page=1');
  return response.data?.results;
}

/**
 * Custom hook to fetch a list of "now playing" movies using React Query.
 *
 * @returns {UseQueryResult<Movie[], Error>} React Query result object containing the movie list, loading state, and error (if any).
 */
const useGetMovies = () => {
  return useQuery({
    queryKey: [queries.getMovies],
    queryFn: getMovies
  });
};

export default useGetMovies;
