import { ApiService } from '../api';

export class ApiClient {
  private readonly client: ApiService;

  constructor(baseURL: string) {
    this.client = new ApiService({ BASE: baseURL });
  }

  get auth() {
    return this.client.auth;
  }

  get wallet() {
    return this.client.wallet;
  }
}

export const apiClient = new ApiClient(window.origin);
