import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ description: '400 | 401 | 403 | 500' })
  public readonly statusCode: number;
  @ApiProperty({ type: String })
  public readonly message: string;
}
