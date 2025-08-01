import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import { mock_movie_one } from '../../mocks/data/movie';
import useGetMovieById from '../../src/hooks/movies/useGetMovieById';
import api from '../../src/utils/api';

jest.mock('../../src/utils/api');

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useGetMovieById', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('fetches and returns movie data by id', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mock_movie_one });

    const { result } = renderHook(() => useGetMovieById(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/movie/1?language=en-US');
    expect(result.current.data).toEqual(mock_movie_one);
  });

  it('does not fetch if id is falsy', () => {
    const { result } = renderHook(() => useGetMovieById(0), { wrapper });

    expect(result.current.isFetching).toBe(false);
  });
});
