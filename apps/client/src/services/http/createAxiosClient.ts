import { AxiosError } from 'axios';

import { AxiosClient } from './axios';
import {
  InterceptorsConfigHandler,
  InterceptorsErrorHandler,
  InterceptorsResponseHandler,
} from './axios/utils/createHttpInterceptor';

const client = new AxiosClient(window.location.origin);

type CreateAxiosInstanceOptions = {
  onRequest?: InterceptorsConfigHandler;
  onRequestError?: InterceptorsErrorHandler;
  onResponse?: InterceptorsResponseHandler;
  onResponseError?: InterceptorsErrorHandler;
};

const FB_CB = <T>(r: T) => r;
const FB_ERROR_CB: InterceptorsErrorHandler = (e) => Promise.reject<AxiosError>(e);

export const createAxiosInstance = ({
  onRequest,
  onRequestError,
  onResponseError,
  onResponse,
}: CreateAxiosInstanceOptions) => {
  const setupInterceptors = () => {
    client.interceptors.onRequest(onRequest || FB_CB, onRequestError || FB_ERROR_CB);

    client.interceptors.onResponse(onResponse || FB_CB, onResponseError || FB_ERROR_CB);
  };

  return {
    axiosClient: client,
    interceptors: client.interceptors,
    setupInterceptors,
  };
};
