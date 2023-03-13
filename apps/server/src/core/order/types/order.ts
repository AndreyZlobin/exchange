import {
  Order as PrismaOrder,
  OrderAmount as PrismaOrderAmount,
  OrderNotes as PrismaOrderNotes,
  OrderRate as PrismaOrderRate,
  OrderStatus as PrismaOrderStatus,
  OrderStatusHistory as PrismaOrderStatusHistory,
} from '@prisma/client';

export type Order = PrismaOrder;
export type CreateOrder = Omit<Order, 'id' | 'userId' | 'updated' | 'created' | 'currencyTypeId'>;

export type OrderAmount = PrismaOrderAmount;
export type OrderNotes = PrismaOrderNotes;

export type OrderRate = PrismaOrderRate;
export type OrderStatus = PrismaOrderStatus;
export type OrderStatusHistory = PrismaOrderStatusHistory;
