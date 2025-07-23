import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import useGetMovieById from '../../app/hooks/movies/useGetMovieById';
import api from '../../app/utils/api';

jest.mock('../../utils/api');

const queryClient = new QueryClient();

describe('useGetMovieById', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('fetches and returns movie data by id', async () => {
    const mockMovie = { id: 1, title: 'Test Movie' };
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockMovie });

    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useGetMovieById(1), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(api.get).toHaveBeenCalledWith('/movie/1?language=en-US');
    expect(result.current.data).toEqual(mockMovie);
  });

  it('does not fetch if id is falsy', () => {
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useGetMovieById(0), { wrapper });

    expect(result.current.isFetching).toBe(false);
  });
});
