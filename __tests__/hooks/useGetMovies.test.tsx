// __tests__/useGetMovies.test.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import useGetMovies from '../../app/hooks/movies/useGetMovies';
import api from '../../app/utils/api';

jest.mock('../../utils/api');

const queryClient = new QueryClient();

describe('useGetMovies', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('fetches and returns list of movies', async () => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { results: mockMovies } });

    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useGetMovies(), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(api.get).toHaveBeenCalledWith('/movie/now_playing?language=en-US&page=1');
    expect(result.current.data).toEqual(mockMovies);
  });
});
