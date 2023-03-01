import { TYPES } from "@DI/types";
import { Module } from "@nestjs/common";
import { AuthCacheService } from "@src/core/auth/cache/cache.service";
import { AuthRepository } from "@src/core/auth/repository";
import { AuthService } from "@src/core/auth/services";
import { UserRepository } from "@src/core/user";

import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  providers: [
    { provide: TYPES.auth.AuthService, useClass: AuthService },
    { provide: TYPES.auth.AuthCacheService, useClass: AuthCacheService },
    { provide: TYPES.auth.AuthRepository, useClass: AuthRepository },
    { provide: TYPES.user.UserRepository, useClass: UserRepository },
  ],
})
export class AuthModule {}
