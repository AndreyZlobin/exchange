import { TYPES } from '@DI/types';
import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ValidateInput } from '@shared/validators';
import { IAuthService } from '@src/core/auth/services';
import { CreateUserDto } from '@src/core/user/dto';

import { UserLoginDto } from './dto';
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
    schema: { $ref: getSchemaPath('User') },
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async registerUser(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Логин', description: 'Вернет пару токенов' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.login(userLoginDto);
  }

  @Post('/reset_password')
  @ApiOperation({ summary: 'Восстановление пароля' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async resetPassword(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Выход пользователя из системы' })
  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async logout() {
    return true;
  }
  @Post('/refresh')
  @ApiOperation({ summary: 'обновление токена' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return await this.authService.refresh(refreshToken);
  }
}
