import { ApiProperty } from '@nestjs/swagger';

import { PaymentSystemWithExcludedFields, System } from '../types';

export class CreatePaymentSystemDto implements PaymentSystemWithExcludedFields {
  @ApiProperty()
  apiKey: string;
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  brokerCommission: number;
  @ApiProperty()
  isAllow: boolean;
  @ApiProperty()
  max: number;
  @ApiProperty()
  min: number;
  @ApiProperty()
  name: System;
  @ApiProperty()
  systemCommission: number;
  @ApiProperty()
  type: System;
}
