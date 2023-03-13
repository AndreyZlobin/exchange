import { ApiProperty } from '@nestjs/swagger';
import { OrderNotesDto } from '@src/core/order/dto/orderNotes.dto';
import { OrderRateDto } from '@src/core/order/dto/orderRate.dto';
import { OrderStatusHistoryDto } from '@src/core/order/dto/orderStatusHistory.dto';
import { PaymentSystemUnion } from '@src/core/paymentSystem/types';

import { CreateOrder, OrderStatus } from '../types';
import { OrderAmountDto } from './orderAmount.dto';

export class CreateOrderDto implements CreateOrder {
  @ApiProperty()
  amount: OrderAmountDto;
  @ApiProperty()
  broker: string;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  cryptoAmountProvider: number;
  @ApiProperty()
  currencyTypeId: string;
  @ApiProperty()
  handler: string;
  @ApiProperty()
  notes: OrderNotesDto;
  @ApiProperty()
  paymentSystem: PaymentSystemUnion;
  @ApiProperty()
  provider: string;
  @ApiProperty()
  rate: OrderRateDto;
  @ApiProperty()
  requisites: string;
  @ApiProperty()
  status: OrderStatus;
  @ApiProperty()
  statusHistory: OrderStatusHistoryDto[];
}
