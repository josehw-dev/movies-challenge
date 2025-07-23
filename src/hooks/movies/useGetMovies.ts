import {useQuery} from '@tanstack/react-query';

import api from '../../utils/api';
import queries from '../../constants/queries';

import {MovieListResponse} from '../../models/movies';

const getMovies = async () => {
  const response = await api.get<MovieListResponse>('/movie/now_playing?language=en-US&page=1');
  return response.data?.results;
}

const useGetMovies = () => {
  return useQuery({
    queryKey: [queries.getMovies],
    queryFn: getMovies
  });
};

export default useGetMovies;
