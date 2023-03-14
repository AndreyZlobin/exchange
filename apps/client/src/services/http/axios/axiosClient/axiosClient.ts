import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HttpInterceptor } from '../utils/createHttpInterceptor';

const defaultConfig: AxiosRequestConfig = {
  headers: { 'Content-Type': 'application/json' },
};

export class AxiosClient {
  readonly #instance: AxiosInstance;

  constructor(baseURL: string, axiosConfig: AxiosRequestConfig = defaultConfig) {
    this.#instance = axios.create({ baseURL, ...axiosConfig });
  }

  get instance(): AxiosInstance {
    return this.#instance;
  }

  get interceptors() {
    return new HttpInterceptor(this.instance);
  }
}
