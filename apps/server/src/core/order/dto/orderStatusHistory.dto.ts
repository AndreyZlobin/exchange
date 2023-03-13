import { ApiProperty } from '@nestjs/swagger';

import { OrderStatus, OrderStatusHistory } from '../types';

export class OrderStatusHistoryDto implements OrderStatusHistory {
  @ApiProperty()
  date: Date;
  @ApiProperty()
  status: OrderStatus;
}
