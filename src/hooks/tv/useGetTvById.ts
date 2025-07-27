import { useQuery } from '@tanstack/react-query';

import queries from '../../constants/queries';
import api from '../../utils/api';

import { TV } from '../../models/tv';

/**
 * Fetches a TV by its ID from the API.
 *
 * @param {number} id - The ID of the movie to fetch.
 * @returns {Promise<Movie>} A promise that resolves to the movie data.
 */
const getTv = async (id: number): Promise<TV> => {
  const response = await api.get<TV>(`/tv/${id}?language=en-US`);
  return response.data;
}

/**
 * Custom hook to fetch a single TV by its ID using React Query.
 *
 * @param {number} id - The ID of the TV to retrieve.
 * @returns {UseQueryResult<Movie>} React Query's result object containing data, status, and error.
 */
const useGetTvById = (id: number) => {
  return useQuery({
    queryKey: [queries.getTvById, id],
    queryFn: () => getTv(id),
    enabled: !!id,
  });
};

export default useGetTvById;
