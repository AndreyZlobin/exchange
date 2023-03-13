import { PaymentSystemEnum } from '@prisma/client';

import { CreateUserPaymentSystemDto } from '../dto';
import { PaymentSystem, PaymentSystemUnion, PaymentSystemWithExcludedFields } from '../types';

export class PaymentSystemEntity implements PaymentSystemWithExcludedFields {
  apiKey: string;
  authToken: string;
  isAllow: boolean;
  name: PaymentSystemUnion;

  system: PaymentSystem;

  userId: string | null;

  static get getDefaultUserPaymentSystem(): CreateUserPaymentSystemDto[] {
    return [
      {
        name: PaymentSystemEnum.card,
        system: {
          type: PaymentSystemEnum.card,
          min: 300,
          max: 15000,
          brokerCommission: 0,
          systemCommission: 20,
        },
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
      {
        name: PaymentSystemEnum.yandex,
        system: {
          type: PaymentSystemEnum.yandex,
          min: 300,
          max: 15000,
          brokerCommission: 0,
          systemCommission: 20,
        },
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
      {
        name: PaymentSystemEnum.qiwi,
        system: {
          type: PaymentSystemEnum.qiwi,
          min: 300,
          max: 15000,
          brokerCommission: 0,
          systemCommission: 20,
        },
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
      {
        name: PaymentSystemEnum.sim,
        system: {
          type: PaymentSystemEnum.sim,
          min: 300,
          max: 15000,
          brokerCommission: 0,
          systemCommission: 20,
        },
        authToken: 'НЕ УСТАНОВЛЕН',
        apiKey: '',
        isAllow: true,
      },
    ];
  }
}
