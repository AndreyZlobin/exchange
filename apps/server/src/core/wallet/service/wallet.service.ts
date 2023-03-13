import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';
import { WalletDto } from '@src/core/wallet/dto';

import { IWalletRepository } from '../repository';
export interface IWalletService {
  getUserWaller(id: string): Promise<WalletDto>;
}
@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @Inject(TYPES.wallet.WalletRepository) private readonly walletRepository: IWalletRepository,
  ) {}

  async getUserWaller(userId: string): Promise<WalletDto> {
    return this.walletRepository.getUserWaller(userId);
  }
}
