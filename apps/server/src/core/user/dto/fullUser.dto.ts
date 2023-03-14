import { ApiProperty } from '@nestjs/swagger';
import { PaymentSystemDto } from '@src/core/paymentSystem/dto';
import { Roles } from '@src/core/roles/constants';
import { UserSettingsDto } from '@src/core/user/dto/userSettings.dto';
import { WalletDto } from '@src/core/wallet/dto';

import { FullUser } from '../types';

export class FullUserDto implements FullUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [PaymentSystemDto] })
  paymentSystems: PaymentSystemDto[];
  @ApiProperty()
  role: Roles;
  @ApiProperty()
  settings: UserSettingsDto;

  @ApiProperty()
  wallet: WalletDto;
  userBlacklistId: string | null;

  createdAt: Date | null;
  deleted: boolean | null;
}
