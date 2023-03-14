import {
  PaymentSystem,
  User as ModelUser,
  UserSettings as ModelUserSettings,
} from '@prisma/client';
import { UserPaymentSystem } from '@src/core/paymentSystem/types';
import { Wallet } from '@src/core/wallet/type';

export type UserSettings = ModelUserSettings;
export type UserSettingsWithExcludedFields = Omit<UserSettings, 'id' | 'userId'>;
export type User = ModelUser & { settings: UserSettings };
export type UserWithoutPassword = Omit<User, 'password'>;
export type FullUser = UserWithoutPassword & {
  wallet: Wallet;
  paymentSystems: UserPaymentSystem[];
};
export type UserWithExcludedFields = Omit<
  User,
  'id' | 'deleted' | 'createdAt' | 'settings' | 'userBlacklistId'
>;
export type UserWithPaymentSetting = UserWithoutPassword & { paymentSystems: PaymentSystem[] };
