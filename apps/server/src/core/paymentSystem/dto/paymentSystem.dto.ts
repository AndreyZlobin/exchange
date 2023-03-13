import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CreateUserPaymentSystemDto } from './createUserPaymentSystem.dto';

export class PaymentSystemDto extends CreateUserPaymentSystemDto {
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  paymentSystemBlacklistId: string | null;
  @ApiProperty()
  userId: string | null;
}
