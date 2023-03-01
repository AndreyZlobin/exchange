import { TYPES } from "@DI/types";
import { Module } from "@nestjs/common";
import { UserRepository } from "@src/core/user/repository";
import { UserService } from "@src/core/user/service";
import { PrismaService } from "@src/database";

import { UserController } from "./user.controller";

@Module({
  providers: [
    { provide: TYPES.user.UserService, useClass: UserService },
    { provide: TYPES.user.UserRepository, useClass: UserRepository },
    { provide: TYPES.DB.PrismaService, useClass: PrismaService },
  ],
  controllers: [UserController],
})
export class UserModule {}
