import { TYPES } from '@DI/types';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Context, UserContext } from '@shared/context';
import { ApiError } from '@shared/exceptions/api.error';

import { WalletDto } from './dto';
import { IWalletService } from './service';

export class WalletEntity {
  get;
}

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(
    @Inject(TYPES.wallet.WalletService)
    private readonly walletService: IWalletService,
  ) {}
  @Get('user')
  @ApiOkResponse({ type: WalletDto })
  @ApiOperation({ summary: 'Получение кошелька пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserWallet(@Context() { userId }: UserContext) {
    return this.walletService.getUserWaller(userId);
  }

  @Get('balance/replenish')
  @ApiOkResponse({ type: Boolean })
  @ApiOperation({ summary: 'Пополнение кошелька пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async replenishBalance(@Context() { userId }: UserContext) {
    return this.walletService.getUserWaller(userId);
  }
}
