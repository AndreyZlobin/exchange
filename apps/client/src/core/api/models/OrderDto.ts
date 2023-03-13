/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderAmountDto } from './OrderAmountDto';
import type { OrderNotesDto } from './OrderNotesDto';

export type OrderDto = {
    amount: OrderAmountDto;
    broker: string;
    clientName: string;
    created: string;
    cryptoAmountProvider: number;
    currencyTypeId: string;
    handler: string;
    id: string;
    notes: OrderNotesDto;
    paymentSystem: string;
    provider: string;
    requisites: string;
    status: string;
    updated: string;
    userId: string;
};
