import { SystemEnum } from '@prisma/client';

import { CreatePaymentSystemDto } from '../dto';
import { PaymentSystemWithExcludedFields, System } from '../types';

export class PaymentSystemEntity implements PaymentSystemWithExcludedFields {
  apiKey: string;
  authToken: string;
  brokerCommission: number;
  isAllow: boolean;
  max: number;
  min: number;
  name: System;
  paymentSystemBlacklistId: string | null;
  systemCommission: number;
  type: System;
  userId: string | null;

  static get getDefaultUserPaymentSystem(): CreatePaymentSystemDto[] {
    return [
      {
        name: SystemEnum.card,
        type: SystemEnum.card,
        min: 300,
        max: 15000,
        brokerCommission: 0,
        systemCommission: 20,
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
      {
        name: SystemEnum.yandex,
        type: SystemEnum.yandex,
        min: 300,
        max: 15000,
        brokerCommission: 0,
        systemCommission: 20,
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
      {
        name: SystemEnum.qiwi,
        type: SystemEnum.qiwi,
        min: 300,
        max: 15000,
        brokerCommission: 0,
        systemCommission: 20,
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
      {
        name: SystemEnum.sim,
        type: SystemEnum.sim,
        min: 300,
        max: 15000,
        brokerCommission: 0,
        systemCommission: 20,
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
    ];
  }
}
