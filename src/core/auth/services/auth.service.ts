import { TYPES } from '@DI/types';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpException } from '@shared/exceptions';
import { IBcryptService } from '@src/common/auth/bcrypt';
import { IJWTService } from '@src/common/auth/jwt';
import { IAuthRepository } from '@src/core/auth';
import { IUserRepository, IUserService } from '@src/core/user';
import { CreateUserDto, UserWithPasswordDto } from '@src/core/user/dto';

import { IAuthCacheService } from '../cache';
import { UserLoginDto } from '../dto';

export interface IAuthService {
  login: (loginDto: UserLoginDto) => Promise<{ accessToken: string; refreshToken: string }>;
  register: (registerDto: CreateUserDto) => Promise<{ id: string } | never>;
  refresh: (token: string) => Promise<{ accessToken: string; refreshToken: string } | never>;
  logout: (userId: string) => Promise<boolean>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(TYPES.auth.AuthRepository) private readonly authRepository: IAuthRepository,
    @Inject(TYPES.auth.AuthCacheService) private readonly authCacheService: IAuthCacheService,
    @Inject(TYPES.user.UserRepository) private readonly userRepository: IUserRepository,
    @Inject(TYPES.user.UserService) private readonly userService: IUserService,
    @Inject(TYPES.services.BcryptService) private readonly bcryptService: IBcryptService,
    @Inject(TYPES.services.JWTService) private readonly jwtService: IJWTService,
  ) {}

  async register({ name, password, role }: CreateUserDto) {
    return this.userService.create({ name, password, role });
  }

  async refresh(refreshToken: string) {
    const token = this.jwtService.verifyToken(
      refreshToken,
      this.jwtService.options.refreshOptions.secret,
    ) as {
      data: string;
    };

    if (!token) throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    const tokenFromCache = await this.authCacheService.getTokenFromCache(
      this.authCacheService.getTokenCacheName('refresh', token.data),
    );

    if (tokenFromCache !== refreshToken)
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    const tokens = this.jwtService.generateTokens(token.data, token.data);

    await this.authCacheService.setTokensToCache(
      token.data,
      tokens.accessToken,
      tokens.refreshToken,
    );

    return tokens;
  }

  private async verifyUser(name: string, password: string): Promise<false | UserWithPasswordDto> {
    const user = await this.userService.findByName(name);

    if (!user) return false;
    const isPasswordMatched = await this.bcryptService.compare(password, user.password);

    if (!isPasswordMatched) return false;
    return user;
  }

  public async login({ name, password }: UserLoginDto) {
    const user = await this.verifyUser(name, password);

    if (!user) {
      throw new HttpException('Не верный логин или пароль', HttpStatus.BAD_REQUEST);
    }

    if (!user.settings.active) {
      throw new HttpException('Пользователь не активен', HttpStatus.BAD_REQUEST);
    }

    const tokens = this.jwtService.generateTokens(user.id, user.id);

    await this.authCacheService.setTokensToCache(user.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  public async logout(userId: string): Promise<boolean> {
    if (!userId) {
      throw new HttpException('Ошибка выхода из аккаунта', HttpStatus.BAD_REQUEST);
    }
    return this.authCacheService.removeTokens(userId);
  }
}
