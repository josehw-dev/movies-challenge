import { useQuery } from '@tanstack/react-query';

import queries from '../../constants/queries';
import api from '../../utils/api';

import { TVListResponse } from '../../models/tv';

/**
 * Fetches the list of currently playing movies from the API.
 *
 * @returns {Promise<Movie[]>} A promise that resolves to an array of Movie objects.
 */
const getTvs = async () => {
  const response = await api.get<TVListResponse>('/tv/popular?language=en-US&page=1');
  return response.data?.results;
}

/**
 * Custom hook to fetch a list of "popular" tv shows using React Query.
 *
 * @returns {UseQueryResult<Movie[], Error>} React Query result object containing the movie list, loading state, and error (if any).
 */
const useGetTvPopular = () => {
  return useQuery({
    queryKey: [queries.getTvshows],
    queryFn: getTvs
  });
};

export default useGetTvPopular;
