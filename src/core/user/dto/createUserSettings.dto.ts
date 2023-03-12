import { ApiPropertyOptional } from '@nestjs/swagger';
import { CurrencyType, PercentMethod } from '@prisma/client';

import { UserSettingsWithExcludedFields } from '../types';

export class CreateUserSettingsDto implements UserSettingsWithExcludedFields {
  @ApiPropertyOptional()
  active: boolean | null;
  @ApiPropertyOptional()
  isWork: boolean | null;
  @ApiPropertyOptional()
  broker: string | null;
  @ApiPropertyOptional()
  canFinishOrders: boolean | null;
  @ApiPropertyOptional()
  canOpenOrdersViaPanel: boolean | null;
  @ApiPropertyOptional()
  canViewDirectBalance: boolean | null;
  @ApiPropertyOptional()
  clientMaxEqualSumOrdersMode: string;
  @ApiPropertyOptional()
  clientMaxEqualSumOrdersOnPeriod: number | null;
  @ApiPropertyOptional()
  clientMaxEqualSumOrdersTime: number | null;
  @ApiPropertyOptional()
  cryptoType: CurrencyType | null;
  @ApiPropertyOptional()
  percentMethod: PercentMethod | null;
  @ApiPropertyOptional()
  sendTxToBlockchain: boolean | null;
}
