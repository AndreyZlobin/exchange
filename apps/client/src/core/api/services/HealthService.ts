/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class HealthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns boolean 
     * @throws ApiError
     */
    public appControllerHeathCheck(): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/health-check',
            errors: {
                500: `internal server error response`,
            },
        });
    }

}
