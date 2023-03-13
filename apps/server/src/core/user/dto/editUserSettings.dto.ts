import { ApiPropertyOptional } from '@nestjs/swagger';
import { CurrencyType, PercentMethod } from '@prisma/client';

import { CreateUserSettingsDto } from './createUserSettings.dto';

export class EditUserSettingsDto implements Partial<CreateUserSettingsDto> {
  @ApiPropertyOptional()
  active?: boolean;
  @ApiPropertyOptional()
  broker?: string;
  @ApiPropertyOptional()
  canFinishOrders?: boolean;
  @ApiPropertyOptional()
  canOpenOrdersViaPanel?: boolean;
  @ApiPropertyOptional()
  canViewDirectBalance?: boolean;
  @ApiPropertyOptional()
  clientMaxEqualSumOrdersMode?: string;
  @ApiPropertyOptional()
  clientMaxEqualSumOrdersOnPeriod?: number;
  @ApiPropertyOptional()
  clientMaxEqualSumOrdersTime?: number;
  @ApiPropertyOptional()
  cryptoType?: CurrencyType;
  @ApiPropertyOptional()
  isWork?: boolean;
  @ApiPropertyOptional()
  percentMethod?: PercentMethod;
  @ApiPropertyOptional()
  sendTxToBlockchain?: boolean;
}
