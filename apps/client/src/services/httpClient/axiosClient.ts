import { AxiosClient } from '@services/http';

export const axiosClient = new AxiosClient(window.location.origin);
