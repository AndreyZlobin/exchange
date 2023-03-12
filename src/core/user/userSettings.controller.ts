import { TYPES } from '@DI/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiError } from '@shared/exceptions/api.error';
import { ValidateInput } from '@shared/validators';
import { RolesGuard } from '@src/core/roles';
import { changeUserWorkStatusSchema } from '@src/core/user/validators';

import { EditUserSettingsDto, UserDto, UserSettingsDto } from './dto';
import { IUserSettingsService } from './service';

@Injectable()
@ApiTags('User Settings')
@Controller('user/settings')
export class UserSettingsController {
  constructor(
    @Inject(TYPES.userSettings.UserSettingsService)
    private readonly userSettingService: IUserSettingsService,
  ) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Получение настроек пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: UserSettingsDto })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async getUserSettings(@Param('userId') userId: string) {
    return this.userSettingService.getById(userId);
  }

  @Post('requisites')
  @ApiOperation({ summary: 'Добавление реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async addUserRequisite() {
    return true;
  }

  @Put('requisites')
  @ApiOperation({ summary: 'Редактирование реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async editUserRequisite() {
    return true;
  }

  @Delete('requisites')
  @ApiOperation({ summary: 'Удаление реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async deleteUserRequisite() {
    return true;
  }

  @Put('requisites/reset')
  @ApiOperation({ summary: 'Сброс реквизита' })
  @ApiHeader({ name: 'Authorization' })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async resetUserRequisite() {
    return true;
  }

  @Put('work_status/:userId')
  @UseGuards(RolesGuard)
  @RolesGuard.Roles(RolesGuard.roles.superadmin, RolesGuard.roles.seller)
  @ValidateInput(changeUserWorkStatusSchema)
  @ApiOperation({ summary: 'Изменение статуса пользователя' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: UserDto })
  @ApiError.forbidden()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async changeUserWorkStatus(
    @Param('userId') userId: string,
    @Body() { isWork }: EditUserSettingsDto,
  ) {
    return this.userSettingService.edit(userId, { isWork });
  }
}
