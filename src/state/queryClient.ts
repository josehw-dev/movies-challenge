import { QueryCache, QueryClient } from '@tanstack/react-query';

/**
 * Custom query cache with global error handler for all queries.
 * Silent queries (meta.silent === true) will suppress console output.
 */
const queryCache = new QueryCache({
  onError: (error, query) => {
    if (query?.meta?.silent !== true) {
      console.error('Query Error:', error);
    }
  },
});

/**
 * Shared QueryClient instance configured with:
 * - offline-first network mode
 * - global error handling
 * - 5-minute stale time for queries
 * - infinite cache retention
 * - 2 automatic retries for failed queries
 */
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: Infinity, // cache never garbage collected
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});

export default queryClient;