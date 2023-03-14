import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
