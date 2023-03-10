import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@src/core/roles/constants';

import { UserWithoutPassword } from '../types';
import { UserSettingsDto } from './userSettings.dto';

export class UserDto implements UserWithoutPassword {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  deleted: boolean;
  @ApiProperty()
  isWork: boolean;
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: Roles;
  @ApiProperty()
  userBlacklistId: string | null;
  @ApiProperty()
  settings: UserSettingsDto;
  // поля, которые не входят в модели свагера
  // paymentSystems: PaymentSystemDto;
}
