import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { IJWTService } from "@src/common/auth/jwt";
import { IRedisService } from "@src/database";

export interface IAuthCacheService {
  getUserTokens(
    cacheKey: string,
  ): Promise<{ accessToken: string | null; refreshToken: string | null }>;
  setTokensToCache(cacheKey: string, access: string, refresh: string): Promise<void>;
  getTokenFromCache(cacheKey: string): Promise<string | null>;
  getTokenCacheName(key: "access" | "refresh", value: string): string;
}

@Injectable()
export class AuthCacheService implements IAuthCacheService {
  constructor(
    @Inject(TYPES.DB.RedisService) private readonly redisService: IRedisService,
    @Inject(TYPES.services.JWTService) private readonly jwtService: IJWTService,
  ) {}

  private get tokenCacheName(): { access: "access_"; refresh: "refresh_" } {
    return {
      access: "access_",
      refresh: "refresh_",
    };
  }
  getTokenCacheName(type: keyof typeof this.tokenCacheName, value: string) {
    return `${this.tokenCacheName[type]}${value}`;
  }

  private async setTokenToCache(key: string, value: string, exp: number) {
    await this.redisService.client.set(key, value, { EX: exp });
  }

  async getTokenFromCache(key: string) {
    return this.redisService.client.get(key);
  }

  async getUserTokens(cacheKey: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.getTokenFromCache(this.getTokenCacheName("access", cacheKey)),
      this.getTokenFromCache(this.getTokenCacheName("refresh", cacheKey)),
    ]);

    return { accessToken, refreshToken };
  }

  async setTokensToCache(cacheKey: string, access: string, refresh: string) {
    const config = this.jwtService.options;

    await Promise.all([
      this.setTokenToCache(
        this.getTokenCacheName("access", cacheKey),
        access,
        config.accessOptions.expiresIn,
      ),
      this.setTokenToCache(
        this.getTokenCacheName("refresh", cacheKey),
        refresh,
        config.refreshOptions.expiresIn,
      ),
    ]);
  }
}
