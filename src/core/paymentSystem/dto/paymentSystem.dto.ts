import { ApiProperty } from '@nestjs/swagger';
import { SystemEnum } from '@prisma/client';

import { PaymentSystem } from '../types';

export class PaymentSystemDto implements PaymentSystem {
  @ApiProperty()
  apiKey: string;
  @ApiProperty()
  authToken: string;
  @ApiProperty()
  brokerCommission: number;
  @ApiProperty()
  id: string;
  @ApiProperty()
  isAllow: boolean;
  @ApiProperty()
  max: number;
  @ApiProperty()
  min: number;
  @ApiProperty()
  name: SystemEnum;
  @ApiProperty()
  paymentSystemBlacklistId: string | null;
  @ApiProperty()
  systemCommission: number;
  @ApiProperty()
  type: SystemEnum;
  @ApiProperty()
  userId: string | null;
}
