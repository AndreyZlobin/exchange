import { HTTP_ERRORS_INFO } from './constants';
import { createResponseErrorInfo } from './utils';

export type ApiResult = {
  readonly url: string;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;
};

export class ApiError extends Error {
  public readonly url: string;

  public readonly status: number;

  public readonly statusText: string;

  public readonly body: unknown;

  constructor(response: ApiResult, message: string) {
    super(message);
    this.name = 'ApiError';
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
  }

  static getHttpErrorInfo(status: number): { code: number; message: string } {
    return HTTP_ERRORS_INFO[status as keyof typeof HTTP_ERRORS_INFO] || HTTP_ERRORS_INFO[500];
  }

  public static createResponseErrorTemplate<T>(status: number, url: string, body?: T) {
    return createResponseErrorInfo(url, false, status, `${status}`, body || {});
  }
}
