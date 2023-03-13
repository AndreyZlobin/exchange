/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WalletDto } from '../models/WalletDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WalletService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Получение кошелька пользователя
     * @returns WalletDto 
     * @throws ApiError
     */
    public walletControllerGetUserWallet({
authorization,
}: {
authorization?: string,
}): CancelablePromise<WalletDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/wallet/user',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Пополнение кошелька пользователя
     * @returns boolean 
     * @throws ApiError
     */
    public walletControllerReplenishBalance({
authorization,
}: {
authorization?: string,
}): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/wallet/balance/replenish',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

}
