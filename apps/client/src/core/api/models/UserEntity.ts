/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserSettingsEntity } from './UserSettingsEntity';

export type UserEntity = {
    name: string;
    role: string;
    settings: UserSettingsEntity;
};
