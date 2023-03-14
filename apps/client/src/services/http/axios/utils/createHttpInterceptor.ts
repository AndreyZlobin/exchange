import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type InterceptorsConfigHandler = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

export type InterceptorsResponseHandler = (
  config: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;

export type InterceptorsErrorHandler = (
  error: AxiosError,
) => Promise<AxiosError | undefined | AxiosResponse>;

interface EjectInterceptorsOptions {
  axiosInterceptor: number;
  instanceInterceptor: number;
}

export class HttpInterceptor {
  instance: AxiosInstance;

  constructor(private readonly httpClient: AxiosInstance) {
    this.instance = httpClient;
  }

  ejectRequestInterceptors({ axiosInterceptor, instanceInterceptor }: EjectInterceptorsOptions) {
    axios.interceptors.request.eject(axiosInterceptor);
    this.instance.interceptors.request.eject(instanceInterceptor);
  }

  ejectResponseInterceptors({ axiosInterceptor, instanceInterceptor }: EjectInterceptorsOptions) {
    axios.interceptors.response.eject(axiosInterceptor);
    this.instance.interceptors.response.eject(instanceInterceptor);
  }

  onRequest(configHandler: InterceptorsConfigHandler, errorHandler: InterceptorsErrorHandler) {
    const axiosInterceptor = axios.interceptors.request.use(configHandler, errorHandler);

    const instanceInterceptor = this.instance.interceptors.request.use(configHandler, errorHandler);

    return { axiosInterceptor, instanceInterceptor };
  }

  onResponse(responseHandler: InterceptorsResponseHandler, errorHandler: InterceptorsErrorHandler) {
    const axiosInterceptor = axios.interceptors.response.use(responseHandler, errorHandler);
    const instanceInterceptor = this.instance.interceptors.response.use(
      responseHandler,
      errorHandler,
    );

    return { axiosInterceptor, instanceInterceptor };
  }
}
