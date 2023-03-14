import { IJWTService } from '@common/auth';
import { TYPES } from '@DI/types';
import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { UserContext } from '@shared/context';
import { HttpException } from '@shared/exceptions';
import { IAuthCacheService } from '@src/core/auth/cache';
import { IPrismaService } from '@src/database';
import { NextFunction, Request, Response } from 'express';

interface RequestWithContext extends Request {
  userContext: UserContext;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject(TYPES.auth.AuthCacheService) private readonly authCacheService: IAuthCacheService,
    @Inject(TYPES.services.JWTService) private readonly jwtService: IJWTService,
    @Inject(TYPES.DB.RedisService) private readonly redisService: IPrismaService,
    @Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService,
  ) {}

  async use(req: RequestWithContext, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!Boolean(authorization)) {
      throw new HttpException('Ошибка авторизации, требуется токен', HttpStatus.UNAUTHORIZED);
    }
    const [, token] = authorization.split(' ');

    try {
      interface DecodedToken {
        data?: string;
      }

      const decodedToken: DecodedToken =
        this.jwtService.verifyToken(token, this.jwtService.options.accessOptions.secret) ?? {};

      if (!decodedToken.data) return next();
      const cache = await this.authCacheService.getTokenFromCache(
        this.authCacheService.getTokenCacheName('access', decodedToken.data),
      );

      if (token !== cache) {
        throw new HttpException('Ошибка авторизации, требуется токен', HttpStatus.UNAUTHORIZED);
      }
      const userContext = new UserContext();
      const user = await this.prismaService.user.findUnique({ where: { id: decodedToken.data } });

      userContext.setUserId(user.id);
      userContext.setUser(user);
      req.userContext = userContext;
      return next();
      // next();
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      }
      const errorMessage = this.jwtService.normalizeJWTError(e);

      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }
  }
}
