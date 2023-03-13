import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';
import { WalletDto } from '@src/core/wallet/dto';
import { IPrismaService } from '@src/database';
export interface IWalletRepository {
  getById(id: string): Promise<WalletDto>;
  getUserWaller(userId: string): Promise<WalletDto>;
}
@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {}
  getById(id: string): Promise<WalletDto> {
    return this.prismaService.wallet.findUnique({ where: { id } });
  }
  async getUserWaller(userId: string): Promise<WalletDto> {
    return this.prismaService.wallet.findUnique({ where: { userId } });
  }
}
