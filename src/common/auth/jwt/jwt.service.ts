import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigServiceWithEnv } from "@src/common/configs";
import {
  decode,
  JsonWebTokenError,
  JwtPayload,
  sign,
  SignOptions,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";

type Token = string;

type Payload = string | Buffer | object;

interface JWTServiceOptions extends SignOptions {
  secret: Token;
  expiresIn: number;
}
export interface IJWTService {
  get options(): { accessOptions: JWTServiceOptions; refreshOptions: JWTServiceOptions };
  generateToken(payLoad: Payload, secret: string, options: SignOptions): string;
  verifyToken(token: string, secret: string): JwtPayload | string;
  decodeToken(token: string): string | JwtPayload | null;
  normalizeJWTError(error: unknown): string;
  generateTokens(
    accessPayload: Payload,
    refreshPayload: Payload,
  ): { accessToken: Token; refreshToken: Token };
}

@Injectable()
export class JWTService implements IJWTService {
  constructor(
    @Inject(TYPES.services.ConfigService) private readonly config: ConfigServiceWithEnv,
  ) {}

  get options() {
    return {
      accessOptions: {
        secret: this.config.get("ACCESS_TOKEN_SECRET"),
        expiresIn: parseInt(this.config.get("ACCESS_TOKEN_EXP")),
      },
      refreshOptions: {
        secret: this.config.get("REFRESH_TOKEN_SECRET"),
        expiresIn: parseInt(this.config.get("REFRESH_TOKEN_EXP")),
      },
    };
  }
  generateToken(payload: Payload, secret: string, options: SignOptions) {
    return sign({ data: payload }, secret, options);
  }
  verifyToken(token: string, secret: string) {
    return verify(token, secret);
  }

  normalizeJWTError(error: unknown): string {
    const errorMap = new Map([
      [TokenExpiredError, "Token Expired"],
      [JsonWebTokenError, "Invalid token"],
    ]);

    return errorMap.get(error.constructor as ErrorConstructor) ?? "Invalid token";
  }
  decodeToken(token: Token) {
    return decode(token);
  }
  generateTokens(accessPayload: Payload, refreshPayload: Payload) {
    const { secret: accessSecret, ...restAccess } = this.options.accessOptions;
    const { secret: refreshSecret, ...restRefresh } = this.options.refreshOptions;

    return {
      accessToken: this.generateToken(accessPayload, accessSecret, restAccess),
      refreshToken: this.generateToken(refreshPayload, refreshSecret, restRefresh),
    };
  }
}
