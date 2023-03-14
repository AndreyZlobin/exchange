import { ApiProperty } from '@nestjs/swagger';

export class MakeRefreshDto {
  @ApiProperty()
  refreshToken: string;
}
