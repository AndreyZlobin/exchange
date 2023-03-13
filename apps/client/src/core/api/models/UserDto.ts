/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserSettingsDto } from './UserSettingsDto';

export type UserDto = {
    id: string;
    createdAt: string;
    deleted: boolean;
    name: string;
    role: string;
    userBlacklistId: string;
    settings: UserSettingsDto;
};
