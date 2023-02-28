// import { IUserRepository } from "@src/app/modules/user";
// import { TYPES } from "@src/DI/container/types";
// import { HTTPException } from "@src/expception";
// import { IBcryptService, IJWTService } from "@src/services";
// import { inject, injectable } from "inversify";
//
// import { IAuthCacheService } from "../cache";
// import { RegisterUserDto, UserLoginDto } from "../dto";
// import { IAuthRepository } from "../repository";
//
// export interface IAuthService {
//   login: (loginDto: UserLoginDto) => Promise<{ accessToken: string; refreshToken: string }>;
//   register: (registerDto: RegisterUserDto) => Promise<{ id: string } | never>;
//   refresh: (token: string) => Promise<{ accessToken: string; refreshToken: string } | never>;
// }
//
// @injectable()
// export class AuthService implements IAuthService {
//   constructor(
//     @inject(TYPES.auth.AuthRepository) private readonly authRepository: IAuthRepository,
//     @inject(TYPES.auth.AuthCacheService) private readonly authCacheService: IAuthCacheService,
//     @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository,
//     @inject(TYPES.BcryptService) private readonly bcryptService: IBcryptService,
//     @inject(TYPES.JWTService) private readonly jwtService: IJWTService,
//   ) {}
//
//   async register({ email, password }: RegisterUserDto) {
//     const isUserExist = await this.userRepository.checkIsUserExist(email);
//
//     if (isUserExist) {
//       throw new HTTPException(400, `User with email ${email} already exist`);
//     }
//     return this.authRepository.register({
//       email,
//       password: await this.bcryptService.hash(password),
//     });
//   }
//
//   async refresh(refreshToken: string) {
//     const token = this.jwtService.verifyToken(
//       refreshToken,
//       this.jwtService.options.refreshOptions.secret,
//     ) as {
//       data: string;
//     };
//
//     if (!token) throw new HTTPException(400, "Invalid refresh token");
//
//     const tokenFromCache = await this.authCacheService.getTokenFromCache(
//       this.authCacheService.getTokenCacheName("refresh", token.data),
//     );
//
//     if (tokenFromCache !== refreshToken) throw new HTTPException(400, "Invalid refresh token");
//
//     const tokens = this.jwtService.generateTokens(token.data, token.data);
//
//     await this.authCacheService.setTokensToCache(
//       token.data,
//       tokens.accessToken,
//       tokens.refreshToken,
//     );
//
//     return tokens;
//   }
//
//   async login({ email, password }: UserLoginDto) {
//     const user = await this.userRepository.findByEmail(email);
//
//     if (!user) {
//       throw new HTTPException(404, `User with email ${email} not found`);
//     }
//
//     const isPasswordValid = await this.bcryptService.compare(password, user.password);
//
//     if (!isPasswordValid) {
//       throw new HTTPException(400, "Incorrect password");
//     }
//     const tokens = this.jwtService.generateTokens(user.id, user.id);
//
//     await this.authCacheService.setTokensToCache(user.id, tokens.accessToken, tokens.refreshToken);
//
//     return tokens;
//   }
// }
