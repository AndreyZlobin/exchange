import { TYPES } from '@DI/types';
import { Global, Module } from '@nestjs/common';
import { JWTService } from '@src/common/auth/jwt/jwt.service';

@Global()
@Module({
  providers: [{ provide: TYPES.services.JWTService, useClass: JWTService }],
  exports: [TYPES.services.JWTService],
})
export class JwtModule {}
