import { queryClient } from './client';

export const invalidateQuery = async (queryKey: string[]) => {
  return queryClient.invalidateQueries({ queryKey });
};
