import { TYPES } from "@DI/types";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IBcryptService } from "@src/common/auth/bcrypt";
import { IJWTService } from "@src/common/auth/jwt";
import { IAuthRepository } from "@src/core/auth";
import { IUserRepository } from "@src/core/user";
import { CreateUserDto } from "@src/core/user/dto";

import { IAuthCacheService } from "../cache";
import { UserLoginDto } from "../dto";

export interface IAuthService {
  login: (loginDto: UserLoginDto) => Promise<{ accessToken: string; refreshToken: string }>;
  register: (registerDto: CreateUserDto) => Promise<{ id: string } | never>;
  refresh: (token: string) => Promise<{ accessToken: string; refreshToken: string } | never>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(TYPES.auth.AuthRepository) private readonly authRepository: IAuthRepository,
    @Inject(TYPES.auth.AuthCacheService) private readonly authCacheService: IAuthCacheService,
    @Inject(TYPES.user.UserRepository) private readonly userRepository: IUserRepository,
    @Inject(TYPES.services.BcryptService) private readonly bcryptService: IBcryptService,
    @Inject(TYPES.services.JWTService) private readonly jwtService: IJWTService,
  ) {}

  async register({ email, password }: CreateUserDto) {
    const isUserExist = Boolean(await this.userRepository.findUser({ name: email }));

    if (isUserExist) {
      throw new HttpException(`User with email ${email} already exist`, HttpStatus.BAD_REQUEST);
    }
    return this.authRepository.register({
      email,
      password: await this.bcryptService.hash(password),
      role: [],
    });
  }

  async refresh(refreshToken: string) {
    const token = this.jwtService.verifyToken(
      refreshToken,
      this.jwtService.options.refreshOptions.secret,
    ) as {
      data: string;
    };

    if (!token) throw new HttpException("Invalid refresh token", HttpStatus.BAD_REQUEST);

    const tokenFromCache = await this.authCacheService.getTokenFromCache(
      this.authCacheService.getTokenCacheName("refresh", token.data),
    );

    if (tokenFromCache !== refreshToken)
      throw new HttpException("Invalid refresh token", HttpStatus.BAD_REQUEST);

    const tokens = this.jwtService.generateTokens(token.data, token.data);

    await this.authCacheService.setTokensToCache(
      token.data,
      tokens.accessToken,
      tokens.refreshToken,
    );

    return tokens;
  }

  async login({ email, password }: UserLoginDto) {
    const user = await this.userRepository.findUser({ name: email });

    if (!user) {
      throw new HttpException(`User with email ${email} not found`, 404);
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException("Incorrect password", HttpStatus.BAD_REQUEST);
    }
    const tokens = this.jwtService.generateTokens(user.id, user.id);

    await this.authCacheService.setTokensToCache(user.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }
}
