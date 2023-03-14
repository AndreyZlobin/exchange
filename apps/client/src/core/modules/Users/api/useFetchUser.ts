import { useQuery } from '@services/query';
import { apiClient } from '@src/core/apiClient/apiClient';

export const USER_KEY = ['users'];
export const useFetchUser = (id: string, enabled: boolean) => {
  return useQuery([...USER_KEY, id], () => apiClient.users.userControllerGetOne({ id }), {
    enabled,
  });
};
