import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@src/core/roles/constants';

export class CreateUserDto {
  @ApiProperty({ required: true, type: String })
  name!: string;
  @ApiProperty({ required: true, type: String })
  password!: string;
  role: Roles;
}
