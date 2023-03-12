import { TYPES } from '@DI/types';
import { Module } from '@nestjs/common';

import { UserRepository, UserSettingsRepository } from './repository';
import { UserService, UserSettingsService } from './service';
import { UserController } from './user.controller';
import { UserSettingsController } from './userSettings.controller';

@Module({
  providers: [
    { provide: TYPES.user.UserService, useClass: UserService },
    { provide: TYPES.user.UserRepository, useClass: UserRepository },
    { provide: TYPES.userSettings.UserSettingsService, useClass: UserSettingsService },
    { provide: TYPES.userSettings.UserSettingRepository, useClass: UserSettingsRepository },
  ],
  controllers: [UserController, UserSettingsController],
})
export class UserModule {}
