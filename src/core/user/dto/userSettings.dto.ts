import { ApiProperty } from '@nestjs/swagger';
import { CurrencyType, PercentMethod } from '@prisma/client';

import { UserSettings } from '../types';

export class UserSettingsDto implements UserSettings {
  @ApiProperty()
  active: boolean | null;
  @ApiProperty()
  broker: string | null;
  @ApiProperty()
  canFinishOrders: boolean | null;
  @ApiProperty()
  canOpenOrdersViaPanel: boolean | null;
  @ApiProperty()
  canViewDirectBalance: boolean | null;
  @ApiProperty()
  clientMaxEqualSumOrdersMode: string;
  @ApiProperty()
  clientMaxEqualSumOrdersOnPeriod: number | null;
  @ApiProperty()
  clientMaxEqualSumOrdersTime: number | null;
  @ApiProperty()
  cryptoType: CurrencyType | null;
  @ApiProperty()
  id: string;
  @ApiProperty()
  percentMethod: PercentMethod | null;
  @ApiProperty()
  sendTxToBlockchain: boolean | null;
  userId: string;
}
