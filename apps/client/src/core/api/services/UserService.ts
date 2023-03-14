/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FullUserDto } from '../models/FullUserDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns UserDto 
     * @throws ApiError
     */
    public userControllerGetUserProfile({
authorization,
}: {
authorization?: string,
}): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/profile',
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
     * Вывод списка пользователей
     * @returns UserDto 
     * @throws ApiError
     */
    public userControllerGetAll({
authorization,
}: {
authorization?: string,
}): CancelablePromise<Array<UserDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/all',
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
     * Получение пользователя по ID
     * @returns FullUserDto 
     * @throws ApiError
     */
    public userControllerGetOne({
id,
authorization,
}: {
id: string,
authorization?: string,
}): CancelablePromise<FullUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}',
            path: {
                'id': id,
            },
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
     * Изменение баланса пользователя
     * @returns void 
     * @throws ApiError
     */
    public userControllerEditUserBalance({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/balance',
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
     * Получения списка пользователей, у которых происходило изменение баланса
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetBalanceHistoryUsers({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/balance/users',
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
     * Получение баланса пользователя
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserBalance({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/balance',
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
     * Получение баланса пользователя
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserDirectBalance({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/balance/direct/{payment_system}',
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
     * Получение истории изменения баланса пользователя
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserBalanceHistory({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/balance/changes',
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
     * TODO: реализовать выгрузку CSV
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserBalanceHistoryCsv({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/balance/changes/csv',
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
     * Получение статистики
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserStats({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/stats',
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
     * Получение статистики пользователя в CSV
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserCsv({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/stats/csv',
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
     * Получение статуса пользователя
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserStatus({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/status',
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
     * Получение списка курсов по платежным системам
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserRates({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/rates',
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
     * Получение курса по конкретной платежной системе
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUserRatesByPaymentSystem({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{id}/rates/{payment_system}',
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
     * Получение списка пользователей с реквизитами
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUsersWithRequisites({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/requisites_users',
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
     * Получение списка реквизитов пользователя
     * @returns void 
     * @throws ApiError
     */
    public userControllerGetUsersRequisites({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/requisites/{username}',
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
     * Изменение лимита по закрытию заявок
     * @returns void 
     * @throws ApiError
     */
    public userControllerEditSupportLimit({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/user/{id}/limit/edit',
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
     * Сброс лимита по закрытию заявок
     * @returns void 
     * @throws ApiError
     */
    public userControllerResetSupportLimit({
authorization,
}: {
authorization?: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/user/{id}/limit/reset',
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

}
