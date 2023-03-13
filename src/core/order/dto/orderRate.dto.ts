import { ApiProperty } from '@nestjs/swagger';

import { OrderRate } from '../types';

export class OrderRateDto implements OrderRate {
  @ApiProperty()
  deal: number;
  @ApiProperty()
  provider: number;
}
