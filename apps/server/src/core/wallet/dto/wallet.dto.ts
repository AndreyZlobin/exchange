import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Wallet } from '../type';

export class WalletDto implements Wallet {
  @ApiProperty()
  address: string;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  balanceDep: number;
  @ApiPropertyOptional()
  createdAt: Date | null;
  @ApiPropertyOptional()
  deleted: boolean | null;
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  walletDepositCheckAmount: number;
}
