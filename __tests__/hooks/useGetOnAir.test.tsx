import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import { tvResponse } from '../../mocks/data/tvShows';
import useGetOnAir from '../../src/hooks/tv/useGetOnAir';
import api from '../../src/utils/api';

jest.mock('../../src/utils/api');

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetOnAir', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('fetches and returns list of tv', async () => {

    (api.get as jest.Mock).mockResolvedValueOnce({ data: tvResponse });

    const { result } = renderHook(() => useGetOnAir(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/tv/on_the_air?language=en-US&page=1');
    expect(result.current.data).toEqual(tvResponse.results);
  });
});
