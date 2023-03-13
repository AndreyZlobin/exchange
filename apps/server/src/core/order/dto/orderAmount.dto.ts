import { ApiProperty } from '@nestjs/swagger';

import { OrderAmount } from '../types';

export class OrderAmountDto implements OrderAmount {
  @ApiProperty()
  cryptoAmountBroker: number;
  @ApiProperty()
  cryptoAmountDeal: number;
  @ApiProperty()
  fiatAmount: number;
  @ApiProperty()
  profit: number;
}
