import { TYPES } from '@DI/types';
import { Controller, Delete, Get, Inject, Injectable, Post, Put, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiError } from '@shared/exceptions/api.error';
import { createValidateSchema, ValidateInput } from '@shared/validators';
import { RolesGuard, SelfWithRoleGuard } from '@src/core/roles';
import { UserEntity } from '@src/core/user/entity';
import { IUserService } from '@src/core/user/service';
import { object, string } from 'yup';

import { UserDto } from './dto';

const t = createValidateSchema({
  body: object({
    email: string().email().required('Email is required field'),
    password: string()
      .min(6, { min: 'Password must be greater 6 symbols' })
      .max(24, { max: 'Password must be less 24 symbols' })
      .required(),
  }),
  query: object({
    test: string().max(1),
  }),
});

@Injectable()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(@Inject(TYPES.user.UserService) private readonly userService: IUserService) {}
  @Get('/profile')
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: UserEntity })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  @ValidateInput(t)
  async getUserProfile() {
    return this.userService.getUserProfile();
  }

  @Get('/')
  @UseGuards(SelfWithRoleGuard)
  @RolesGuard.Roles(RolesGuard.roles.superadmin, RolesGuard.roles.admin, RolesGuard.roles.provider)
  @ApiOperation({ summary: 'Вывод списка пользователей' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: [UserDto] })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getAll() {
    return this.userService.getAll();
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Редактирование пользователя' })
  @UseGuards(RolesGuard)
  @RolesGuard.Roles(RolesGuard.roles.superadmin, RolesGuard.roles.admin, RolesGuard.roles.provider)
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: [UserEntity] })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getOne() {
    return true;
  }

  @Get('/balance')
  @ApiOperation({ summary: 'Изменение баланса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async editUserBalance() {
    return true;
  }

  @Get('/balance/users')
  @ApiOperation({
    summary: 'Получения списка пользователей, у которых происходило изменение баланса',
  })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getBalanceHistoryUsers() {
    return true;
  }

  @Get('/:id/balance')
  @ApiOperation({ summary: 'Получение баланса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserBalance() {
    return true;
  }

  @Get('/:id/balance/direct/:payment_system')
  @ApiOperation({ summary: 'Получение баланса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserDirectBalance() {
    return true;
  }

  @Get('/:id/balance/changes')
  @ApiOperation({ summary: 'Получение истории изменения баланса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserBalanceHistory() {
    return true;
  }

  @Get('/:id/balance/changes/csv')
  @ApiOperation({ summary: 'TODO: реализовать выгрузку CSV' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserBalanceHistoryCsv() {
    return true;
  }

  @Get('/:id/stats')
  @ApiOperation({ summary: 'Получение статистики' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserStats() {
    return true;
  }

  @Get('/:id/stats/csv')
  @ApiOperation({ summary: 'Получение статистики пользователя в CSV' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserCsv() {
    return true;
  }

  @Get('/:id/status')
  @ApiOperation({ summary: 'Получение статуса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserStatus() {
    return true;
  }

  @Get('/:id/rates')
  @ApiOperation({ summary: 'Получение списка курсов по платежным системам' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserRates() {
    return true;
  }

  @Get('/:id/rates/:payment_system')
  @ApiOperation({ summary: 'Получение курса по конкретной платежной системе' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserRatesByPaymentSystem() {
    return true;
  }

  @Get('/requisites_users')
  @ApiOperation({ summary: 'Получение списка пользователей с реквизитами' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUsersWithRequisites() {
    return true;
  }

  @Get('/requisites/:username')
  @ApiOperation({ summary: 'Получение списка реквизитов пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUsersRequisites() {
    return true;
  }

  @Post('/settings/requisites')
  @ApiOperation({ summary: 'Добавление реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async addUserRequisite() {
    return true;
  }

  @Put('/settings/requisites')
  @ApiOperation({ summary: 'Редактирование реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async editUserRequisite() {
    return true;
  }

  @Delete('/settings/requisites')
  @ApiOperation({ summary: 'Удаление реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async deleteUserRequisite() {
    return true;
  }

  @Put('/settings/requisites/reset')
  @ApiOperation({ summary: 'Сброс реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async resetUserRequisite() {
    return true;
  }

  @Put('/settings/mass')
  @ApiOperation({ summary: 'Массовое изменение' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async massEdit() {
    return true;
  }

  @Put('/settings/work_status/:work_status')
  @ApiOperation({ summary: 'Изменение статуса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async changeUserWorkStatus() {
    return true;
  }
  @Put(':id/limit/edit')
  @ApiOperation({ summary: 'Изменение лимита по закрытию заявок' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async editSupportLimit() {
    return true;
  }
  @Put(':id/limit/reset')
  @ApiOperation({ summary: 'Сброс лимита по закрытию заявок' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async resetSupportLimit() {
    return true;
  }
}
