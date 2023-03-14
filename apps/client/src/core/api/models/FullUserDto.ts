/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentSystemDto } from './PaymentSystemDto';
import type { UserSettingsDto } from './UserSettingsDto';
import type { WalletDto } from './WalletDto';

export type FullUserDto = {
    id: string;
    name: string;
    paymentSystems: Array<PaymentSystemDto>;
    role: string;
    settings: UserSettingsDto;
    wallet: WalletDto;
};
