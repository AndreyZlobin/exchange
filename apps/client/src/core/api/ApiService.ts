/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AuthService } from './services/AuthService';
import { HealthService } from './services/HealthService';
import { OrderService } from './services/OrderService';
import { UserService } from './services/UserService';
import { UserSettingsService } from './services/UserSettingsService';
import { WalletService } from './services/WalletService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiService {

    public readonly auth: AuthService;
    public readonly health: HealthService;
    public readonly order: OrderService;
    public readonly user: UserService;
    public readonly userSettings: UserSettingsService;
    public readonly wallet: WalletService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.auth = new AuthService(this.request);
        this.health = new HealthService(this.request);
        this.order = new OrderService(this.request);
        this.user = new UserService(this.request);
        this.userSettings = new UserSettingsService(this.request);
        this.wallet = new WalletService(this.request);
    }
}
