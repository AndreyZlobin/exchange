import { TYPES } from '@DI/types';
import { Global, Module } from '@nestjs/common';

import { BinanceService, GarantexService } from './services';

@Global()
@Module({
  providers: [
    { provide: TYPES.integration.BinanceService, useClass: BinanceService },
    { provide: TYPES.integration.GarantexService, useClass: GarantexService },
  ],
  exports: [TYPES.integration.BinanceService, TYPES.integration.GarantexService],
})
export class IntegrationModule {}
