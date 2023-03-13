import { TYPES } from '@DI/types';
import { Global, Module } from '@nestjs/common';

import { ConfigService } from './config.service';
@Global()
@Module({
  providers: [{ provide: TYPES.services.ConfigService, useClass: ConfigService }],
  exports: [TYPES.services.ConfigService],
})
export class ConfigModule {}
