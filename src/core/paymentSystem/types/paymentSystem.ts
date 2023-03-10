import { PaymentSystem as PrismaPaymentSystem, SystemEnum } from '@prisma/client';
export type System = (typeof SystemEnum)[keyof typeof SystemEnum];
export type PaymentSystem = PrismaPaymentSystem;
export type PaymentSystemWithExcludedFields = Omit<
  PaymentSystem,
  'id' | 'userId' | 'paymentSystemBlacklistId'
>;
