import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CreatePaymentSystemDto } from './createPaymentSystem.dto';

export class PaymentSystemDto extends CreatePaymentSystemDto {
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  paymentSystemBlacklistId: string | null;
  @ApiProperty()
  userId: string | null;
}
