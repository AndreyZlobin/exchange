/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserSettingsDto = {
    active: boolean;
    broker: string;
    canFinishOrders: boolean;
    canOpenOrdersViaPanel: boolean;
    canViewDirectBalance: boolean;
    clientMaxEqualSumOrdersMode: string;
    clientMaxEqualSumOrdersOnPeriod: number;
    clientMaxEqualSumOrdersTime: number;
    cryptoType: string;
    id: string;
    isWork: boolean;
    percentMethod: string;
    sendTxToBlockchain: boolean;
};
