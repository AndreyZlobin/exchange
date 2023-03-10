import { TYPES } from '@DI/types';
import { Module } from '@nestjs/common';
import { UserRepository } from '@src/core/user/repository';
import { UserService } from '@src/core/user/service';

import { UserController } from './user.controller';

@Module({
  providers: [
    { provide: TYPES.user.UserService, useClass: UserService },
    { provide: TYPES.user.UserRepository, useClass: UserRepository },
  ],
  controllers: [UserController],
})
export class UserModule {}
