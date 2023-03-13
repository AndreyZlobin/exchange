import { ApiProperty } from '@nestjs/swagger';

import { PaymentSystem, PaymentSystemUnion, PaymentSystemWithExcludedFields } from '../types';

export class CreatePaymentSystemDto implements PaymentSystem {
  @ApiProperty()
  brokerCommission: number;
  @ApiProperty()
  max: number;
  @ApiProperty()
  min: number;
  @ApiProperty()
  systemCommission: number;
  @ApiProperty()
  type: PaymentSystemUnion;
}

export class CreateUserPaymentSystemDto implements PaymentSystemWithExcludedFields {
  @ApiProperty()
  system: CreatePaymentSystemDto;

  @ApiProperty()
  apiKey: string;
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  isAllow: boolean;
  @ApiProperty()
  name: PaymentSystemUnion;
}
