import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@src/core/roles/constants';

export class CreateUserDto {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  password!: string;
  @ApiProperty()
  role: Roles;
}
