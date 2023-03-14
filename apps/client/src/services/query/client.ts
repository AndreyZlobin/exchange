import { ApiError } from '@services/http';
import { QueryClient } from '@tanstack/react-query';
import { errorHandler } from '@utils/errorHandler';

const onError = async (error: unknown) => {
  const err = error as ApiError | Error;

  try {
    return errorHandler(err);
  } catch (e) {
    return errorHandler(e);
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      retry: 0,
      onError,
    },
    mutations: { onError },
  },
});
