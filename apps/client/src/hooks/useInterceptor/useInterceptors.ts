import { AxiosClient } from '@services/http';
import {
  InterceptorsConfigHandler,
  InterceptorsErrorHandler,
  InterceptorsResponseHandler,
} from '@services/http/axios/utils/createHttpInterceptor';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

type UseAuthInterceptorsOptions = {
  client: AxiosClient;
  onRequest?: InterceptorsConfigHandler;
  onRequestError?: InterceptorsErrorHandler;
  onResponse?: InterceptorsResponseHandler;
  onResponseError?: InterceptorsErrorHandler;
};

const FB_CB = <T>(r: T) => r;
const FB_ERROR_CB: InterceptorsErrorHandler = (e) => Promise.reject<AxiosError>(e);

export const useInterceptors = ({
  client,
  onResponse,
  onResponseError,
  onRequestError,
  onRequest,
}: UseAuthInterceptorsOptions) => {
  useEffect(() => {
    const { interceptors } = client;

    const requestConfig = interceptors.onRequest(onRequest || FB_CB, onRequestError || FB_ERROR_CB);

    const responseConfig = interceptors.onResponse(
      onResponse || FB_CB,
      onResponseError || FB_ERROR_CB,
    );

    return () => {
      interceptors.ejectRequestInterceptors(requestConfig);
      interceptors.ejectResponseInterceptors(responseConfig);
    };
  }, []);
};
