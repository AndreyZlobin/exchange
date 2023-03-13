/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EditUserSettingsDto } from '../models/EditUserSettingsDto';
import type { UserDto } from '../models/UserDto';
import type { UserSettingsDto } from '../models/UserSettingsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserSettingsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Получение настроек пользователя
     * @returns UserSettingsDto 
     * @throws ApiError
     */
    public userSettingsControllerGetUserSettings({
userId,
authorization,
}: {
userId: string,
authorization?: string,
}): CancelablePromise<UserSettingsDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/settings/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Добавление реквизита
     * @returns void 
     * @throws ApiError
     */
    public userSettingsControllerAddUserRequisite({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/user/settings/requisites',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Редактирование реквизита
     * @returns void 
     * @throws ApiError
     */
    public userSettingsControllerEditUserRequisite({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/user/settings/requisites',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Удаление реквизита
     * @returns void 
     * @throws ApiError
     */
    public userSettingsControllerDeleteUserRequisite({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/user/settings/requisites',
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
     * Сброс реквизита
     * @returns void 
     * @throws ApiError
     */
    public userSettingsControllerResetUserRequisite({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/user/settings/requisites/reset',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Изменение статуса пользователя
     * @returns UserDto 
     * @throws ApiError
     */
    public userSettingsControllerChangeUserWorkStatus({
userId,
requestBody,
authorization,
}: {
userId: string,
requestBody: EditUserSettingsDto,
authorization?: string,
}): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/user/settings/work_status/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `internal server error response`,
            },
        });
    }

}
