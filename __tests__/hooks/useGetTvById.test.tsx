import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';

import { mock_tv_one } from '../../mocks/data/tv';
import useGetTvById from '../../src/hooks/tv/useGetTvById';
import api from '../../src/utils/api';

jest.mock('../../src/utils/api');

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useGetTvById', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('fetches and returns tv data by id', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mock_tv_one });

    const { result } = renderHook(() => useGetTvById(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.get).toHaveBeenCalledWith('/tv/1?language=en-US');
    expect(result.current.data).toEqual(mock_tv_one);
  });

  it('does not fetch if id is falsy', () => {
    const { result } = renderHook(() => useGetTvById(0), { wrapper });

    expect(result.current.isFetching).toBe(false);
  });
});
