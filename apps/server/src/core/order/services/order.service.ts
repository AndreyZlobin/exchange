import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';

import { IOrderRepository } from '../repository';
import { Order } from '../types';

export interface IOrderService {
  getUserOrders(userId: string): Promise<Order[]>;
}

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(TYPES.order.OrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  getUserOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.findAll(userId);
  }
}
