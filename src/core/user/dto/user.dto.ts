import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@src/core/roles/constants';

import { User } from '../types';
import { UserSettingsDto } from './userSettings.dto';

export class UserDto implements User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date | null;
  @ApiProperty()
  deleted: boolean | null;
  @ApiProperty()
  isWork: boolean | null;
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: Roles;
  @ApiProperty()
  settings: UserSettingsDto;
  // поля, которые не входят в модели свагера
  // paymentSystems: PaymentSystemDto;
  userBlacklistId: string | null;
  password: string;
}
