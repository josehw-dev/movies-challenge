import {useQuery} from '@tanstack/react-query';

import api from '../../utils/api';
import queries from '../../constants/queries';

import {Movie} from '../../models/movies';

const getMovies = async (id: number) => {
  const response = await api.get<Movie>(`/movie/${id}?language=en-US`);
  return response.data;
}

const useGetMovieById = (id: number) => {
  return useQuery({
    queryKey: [queries.getMovieById, id],
    queryFn: () => getMovies(id),
    enabled: !!id,
  });
};

export default useGetMovieById;
