import { TYPES } from '@DI/types';
import { Global, Module } from '@nestjs/common';
import { BcryptService } from '@src/common/auth/bcrypt/bcrypt.service';

@Global()
@Module({
  providers: [{ provide: TYPES.services.BcryptService, useClass: BcryptService }],
  exports: [TYPES.services.BcryptService],
})
export class BcryptModule {}
