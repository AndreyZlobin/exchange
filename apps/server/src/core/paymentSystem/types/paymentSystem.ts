import {
  PaymentSystem as PrismaPaymentSystem,
  PaymentSystemEnum,
  UserPaymentSystem as PrismaUserPaymentSystem,
} from '@prisma/client';
export type PaymentSystemUnion = (typeof PaymentSystemEnum)[keyof typeof PaymentSystemEnum];
export type PaymentSystem = PrismaPaymentSystem;
export type UserPaymentSystem = PrismaUserPaymentSystem;
export type PaymentSystemWithExcludedFields = Omit<
  UserPaymentSystem,
  'id' | 'userId' | 'paymentSystemBlacklistId'
>;
