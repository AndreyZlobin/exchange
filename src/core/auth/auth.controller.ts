import { TYPES } from '@DI/types';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Context, UserContext } from '@shared/context';
import { ApiError } from '@shared/exceptions/api.error';
import { ValidateInput } from '@shared/validators';
import { IAuthService } from '@src/core/auth/services';
import { RolesGuard } from '@src/core/roles';
import { CreateUserDto } from '@src/core/user/dto';
import { UserEntity } from '@src/core/user/entity';

import { LoginResultDto, UserLoginDto } from './dto';
import { registerSchema } from './validations';

@ApiTags('Auth')
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(@Inject(TYPES.auth.AuthService) private readonly authService: IAuthService) {}
  @Post('/register')
  @ValidateInput(registerSchema)
  @ApiOperation({ summary: 'Регистрация пользователя', description: 'Вернет профиль' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created',
    type: UserEntity,
  })
  @ApiError.badRequest()
  @ApiError.internalServerError()
  @UseGuards(RolesGuard)
  @RolesGuard.Roles(RolesGuard.roles.superadmin, RolesGuard.roles.admin, RolesGuard.roles.provider)
  async registerUser(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Логин', description: 'Вернет пару токенов' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResultDto })
  @ApiError.badRequest()
  @ApiError.internalServerError()
  @ApiHeader({ name: 'token' })
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.login(userLoginDto);
  }

  @Post('/reset_password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Восстановление пароля' })
  @ApiError.badRequest()
  @ApiError.internalServerError()
  async resetPassword(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @ApiBearerAuth()
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async logout(@Context() context: UserContext) {
    return this.authService.logout(context.userId);
  }
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'обновление токена' })
  @ApiError.badRequest()
  @ApiError.unauthorized()
  @ApiError.internalServerError()
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return await this.authService.refresh(refreshToken);
  }
}
