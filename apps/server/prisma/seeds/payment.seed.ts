import { PaymentSystemEnum } from '@prisma/client';

import { prisma } from './client';
import { UserPaymentSystem } from '.prisma/client';

export const paymentSystemSeeders: Array<Omit<UserPaymentSystem, 'id' | 'paymentSystemBlacklistId' | 'userId'>> = [
  {
    name: PaymentSystemEnum.card,
    system: {
      type: PaymentSystemEnum.card,
      min: 300,
      max: 15000,
      brokerCommission: 0,
      systemCommission: 20,
    },
    isAllow: true,
    authToken: 'НЕ УСТАНОВЛЕН',
    apiKey: '',
  },
  {
    name: PaymentSystemEnum.yandex,
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
    name: PaymentSystemEnum.qiwi,
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
    name: PaymentSystemEnum.sim,
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
];

export const createPaymentSystem = () => {
  prisma.$transaction(paymentSystemSeeders.map((data) => prisma.userPaymentSystem.create({ data })));
};
