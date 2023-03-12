import { ApiProperty } from '@nestjs/swagger';

export class UserStatusDto {
  @ApiProperty()
  public readonly isWork: boolean;
}
