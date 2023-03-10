import { User as ModelUser, UserSettings as ModelUserSettings } from '@prisma/client';

export type UserSettings = ModelUserSettings;
export type UserSettingsWithExcludedFields = Omit<UserSettings, 'id' | 'userId'>;
export type User = ModelUser & { settings: UserSettings };
export type UserWithExcludedFields = Omit<User, 'id' | 'deleted' | 'createdAt' | 'settings'>;
export type UserWithoutPassword = Omit<User, 'password'>;
