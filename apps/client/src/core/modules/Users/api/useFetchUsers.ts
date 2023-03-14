import { useQuery } from '@services/query';
import { apiClient } from '@src/core/apiClient/apiClient';

export const USER_KEY = ['users'];
export const useFetchUsers = () =>
  useQuery(USER_KEY, () => apiClient.users.userControllerGetAll({}));
