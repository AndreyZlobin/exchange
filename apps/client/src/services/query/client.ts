import { QueryClient } from '@tanstack/react-query';

const onError = async () => {
  // const onError = async (error: unknown) => {
  // @todo some error handler
  // console.log(error);
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
queryClient.getQueriesData(['profile']);
