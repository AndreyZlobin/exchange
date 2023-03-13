import { ApiProperty } from '@nestjs/swagger';
import { PaymentSystemUnion } from '@src/core/paymentSystem/types';

import { Order, OrderStatus } from '../types';
import { OrderAmountDto } from './orderAmount.dto';
import { OrderNotesDto } from './orderNotes.dto';
import { OrderRateDto } from './orderRate.dto';
import { OrderStatusHistoryDto } from './orderStatusHistory.dto';

export class OrderDto implements Order {
  @ApiProperty()
  amount: OrderAmountDto;
  @ApiProperty()
  broker: string;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  created: Date;
  @ApiProperty()
  cryptoAmountProvider: number;
  @ApiProperty()
  currencyTypeId: string;
  @ApiProperty()
  handler: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  notes: OrderNotesDto;
  @ApiProperty()
  paymentSystem: PaymentSystemUnion;
  @ApiProperty()
  provider: string;
  rate: OrderRateDto;
  @ApiProperty()
  requisites: string;
  @ApiProperty()
  status: OrderStatus;
  statusHistory: OrderStatusHistoryDto[];
  @ApiProperty()
  updated: Date;
  @ApiProperty()
  userId: string;
}
