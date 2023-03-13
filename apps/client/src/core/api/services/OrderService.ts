/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderDto } from '../models/OrderDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OrderService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Получение списка всех заявок
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerGetOrders({
authorization,
}: {
authorization?: string,
}): CancelablePromise<Array<OrderDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders',
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
     * Создание заявки
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerCreate({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders',
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
     * Получение конкретной заявки
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerGetOrder({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/{id}',
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
     * Изменение заявки
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerEditOrder({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/orders/{id}',
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
     * отмена заявки
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerCancelOrder({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/orders/{id}/cancel',
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
     * Отметка заявки оплаченной
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerMarkPaidOrder({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/orders/{id}/paid',
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
     * Заявка закрыта
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerFinishOrder({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/orders/{id}/finish',
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
     * Получение списка претензий по заявке
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerGetOrderClaims({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/{id}/claim',
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
     * Создание претензии заявки
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerOpenOrderClaim({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders/{id}/claim',
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
     * Отмена претензии заявки
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerCancelOrderClaim({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/orders/{id}/claim',
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
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerAddOrderToRenew({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders/{id}/confirm',
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
     * @returns OrderDto 
     * @throws ApiError
     */
    public orderControllerConfirmOrderRenew({
authorization,
}: {
authorization?: string,
}): CancelablePromise<OrderDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/orders/{id}/confirm',
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
     * @returns any 
     * @throws ApiError
     */
    public orderControllerSwitchNote({
authorization,
}: {
authorization?: string,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/orders/{id}/notes/{type}',
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
