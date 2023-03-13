import { TYPES } from '@DI/types';
import { Module } from '@nestjs/common';

import { WalletRepository } from './repository';
import { WalletService } from './service';
import { WalletController } from './wallet.controller';
@Module({
  providers: [
    { provide: TYPES.wallet.WalletService, useClass: WalletService },
    { provide: TYPES.wallet.WalletRepository, useClass: WalletRepository },
  ],
  controllers: [WalletController],
})
export class WalletModule {}
