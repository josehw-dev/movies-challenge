import { useQuery } from '@tanstack/react-query';

import queries from '../../constants/queries';
import api from '../../utils/api';

import { Movie } from '../../models/movies';

/**
 * Fetches a movie by its ID from the API.
 *
 * @param {number} id - The ID of the movie to fetch.
 * @returns {Promise<Movie>} A promise that resolves to the movie data.
 */
const getMovies = async (id: number): Promise<Movie> => {
  const response = await api.get<Movie>(`/movie/${id}?language=en-US`);
  return response.data;
}

/**
 * Custom hook to fetch a single movie by its ID using React Query.
 *
 * @param {number} id - The ID of the movie to retrieve.
 * @returns {UseQueryResult<Movie>} React Query's result object containing data, status, and error.
 */
const useGetMovieById = (id: number) => {
  return useQuery({
    queryKey: [queries.getMovieById, id],
    queryFn: () => getMovies(id),
    enabled: !!id,
  });
};

export default useGetMovieById;
