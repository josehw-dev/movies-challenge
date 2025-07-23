import {QueryClient, QueryCache} from '@tanstack/react-query';

const queryCache = new QueryCache({
  onError: (error, query) => {
    if (query?.meta?.silent !== true) {
      console.error('Query Error:', error);
    }
  },
});

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      retry: 2,
      staleTime: 1000 * 60 * 5,
      gcTime: Infinity,
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});

export default queryClient;