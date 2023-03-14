/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreatePaymentSystemDto } from './CreatePaymentSystemDto';

export type PaymentSystemDto = {
    system: CreatePaymentSystemDto;
    apiKey: string;
    authToken: string;
    isAllow: boolean;
    name: string;
    id: string;
    paymentSystemBlacklistId?: string;
    userId: string;
};
