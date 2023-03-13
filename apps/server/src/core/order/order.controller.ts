import { TYPES } from '@DI/types';
import { Controller, Delete, Get, Inject, Injectable, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiError } from '@shared/exceptions/api.error';
import { OrderDto } from '@src/core/order/dto/order.dto';

import { IOrderService } from './services';
@Injectable()
@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(@Inject(TYPES.order.OrderService) private readonly orderService: IOrderService) {}
  @Get()
  @ApiOperation({ summary: 'Получение списка всех заявок' })
  @ApiOkResponse({ type: [OrderDto] })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  getOrders() {
    return true;
  }
  @Get(':id')
  @ApiOperation({ summary: 'Получение конкретной заявки' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  getOrder() {
    return true;
  }
  @Post()
  @ApiOperation({ summary: 'Создание заявки' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  create() {
    return false;
  }
  @Put(':id/cancel')
  @ApiOperation({ summary: 'отмена заявки' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  cancelOrder() {
    return true;
  }
  @Put(':id/paid')
  @ApiOperation({ summary: 'Отметка заявки оплаченной' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  markPaidOrder() {
    return true;
  }
  @Put(':id/finish')
  @ApiOperation({ summary: 'Заявка закрыта' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  finishOrder() {
    return true;
  }

  @Get(':id/claim')
  @ApiOperation({ summary: 'Получение списка претензий по заявке' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  getOrderClaims() {
    return true;
  }
  @Post(':id/claim')
  @ApiOperation({ summary: 'Создание претензии заявки' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  openOrderClaim() {
    return true;
  }
  @Delete(':id/claim')
  @ApiOperation({ summary: 'Отмена претензии заявки' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  cancelOrderClaim() {
    return true;
  }
  @Post(':id/confirm')
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  addOrderToRenew() {
    return true;
  }
  @Put(':id/confirm')
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  confirmOrderRenew() {
    return true;
  }
  @Put(':id')
  @ApiOperation({ summary: 'Изменение заявки' })
  @ApiOkResponse({ type: OrderDto })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  editOrder() {
    return true;
  }
  @Put(':id/notes/:type')
  @ApiOkResponse()
  @ApiHeader({ name: 'Authorization' })
  @ApiError.badRequest()
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  switchNote() {
    return true;
  }
}
