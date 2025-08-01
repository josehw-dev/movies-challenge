import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import { moviesResponse } from '../../mocks/data/movies';
import useGetMovies from '../../src/hooks/movies/useGetMovies';
import api from '../../src/utils/api';

jest.mock('../../src/utils/api');

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetMovies', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('fetches and returns list of movies', async () => {

    (api.get as jest.Mock).mockResolvedValueOnce({ data: moviesResponse });

    const { result } = renderHook(() => useGetMovies(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/movie/now_playing?language=en-US&page=1');
    expect(result.current.data).toEqual(moviesResponse.results);
  });
});
