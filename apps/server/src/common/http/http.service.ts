import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

import { HttpServiceParams, IHttpService } from "./http.interface";

@Injectable()
export class HttpService implements IHttpService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({ timeout: 30000 });
  }

  async delete<Result = unknown>(url: string, options?: HttpServiceParams) {
    try {
      const { data } = await this.instance.delete<Result>(url, options);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async get<Result = unknown>(url: string, options?: HttpServiceParams): Promise<Result> {
    try {
      const { data } = await this.instance.get<Result>(url, options);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async patch<Body extends object, Result = unknown>(
    url: string,
    body?: Body,
    options?: HttpServiceParams,
  ): Promise<Result> {
    try {
      const { data } = await this.instance.patch<Result>(url, body, options);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async post<Body extends object, Result = unknown>(
    url: string,
    body?: Body,
    options?: HttpServiceParams,
  ): Promise<Result> {
    try {
      const { data } = await this.instance.post<Result>(url, body, options);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async put<Body extends object, Result = unknown>(
    url: string,
    body?: Body,
    options?: HttpServiceParams,
  ): Promise<Result> {
    try {
      const { data } = await this.instance.put<Result>(url, body, options);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
