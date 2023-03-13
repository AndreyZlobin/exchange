export type HttpServiceParams = Record<string, unknown>;

export interface IHttpService {
  get<Result = unknown>(url: string, options?: HttpServiceParams): Promise<Result>;

  post<Body extends object, Result = unknown>(
    url: string,
    body?: Body,
    options?: HttpServiceParams,
  ): Promise<Result>;

  delete<Result = unknown>(url: string, options?: HttpServiceParams): Promise<Result>;

  put<Body extends object, Result = unknown>(
    url: string,
    body?: Body,
    options?: HttpServiceParams,
  ): Promise<Result>;

  patch<Body extends object, Result = unknown>(
    url: string,
    body?: Body,
    options?: HttpServiceParams,
  ): Promise<Result>;
}
