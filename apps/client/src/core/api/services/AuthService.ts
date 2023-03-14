/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { LoginResultDto } from '../models/LoginResultDto';
import type { MakeRefreshDto } from '../models/MakeRefreshDto';
import type { RefreshDto } from '../models/RefreshDto';
import type { UserEntity } from '../models/UserEntity';
import type { UserLoginDto } from '../models/UserLoginDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Регистрация пользователя
     * Вернет профиль
     * @returns UserEntity The record has been successfully created
     * @throws ApiError
     */
    public authControllerRegisterUser({
requestBody,
}: {
requestBody: CreateUserDto,
}): CancelablePromise<UserEntity> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Логин
     * Вернет пару токенов
     * @returns LoginResultDto 
     * @throws ApiError
     */
    public authControllerLogin({
requestBody,
token,
}: {
requestBody: UserLoginDto,
token?: string,
}): CancelablePromise<LoginResultDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/login',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Восстановление пароля
     * @returns void 
     * @throws ApiError
     */
    public authControllerResetPassword({
requestBody,
}: {
requestBody: CreateUserDto,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/reset_password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * Выход пользователя из системы
     * @returns void 
     * @throws ApiError
     */
    public authControllerLogout(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/logout',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                500: `internal server error response`,
            },
        });
    }

    /**
     * обновление токена
     * @returns RefreshDto 
     * @throws ApiError
     */
    public authControllerRefresh({
requestBody,
}: {
requestBody: MakeRefreshDto,
}): CancelablePromise<RefreshDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                500: `internal server error response`,
            },
        });
    }

}
