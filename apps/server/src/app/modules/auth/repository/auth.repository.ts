// import { TYPES } from "@src/DI/container/types";
// import { IPrismaService } from "@src/infra";
// import { inject, injectable } from "inversify";
//
// import { RegisterUserDto, UserLoginDto } from "../dto";
//
// export interface IAuthRepository {
//   checkIsUserExist(email: string): Promise<boolean>;
//
//   login(userLoginDto: UserLoginDto): Promise<void>;
//
//   logout(): Promise<void>;
//
//   register(
//     registerUserDto: RegisterUserDto,
//   ): Promise<{ email: string; id: string; isBlocked: boolean }>;
//
//   forgotPassword(): Promise<void>;
//
//   refresh(): Promise<void>;
// }
//
// @injectable()
// export class AuthRepository implements IAuthRepository {
//   constructor(@inject(TYPES.PrismaService) private readonly prismaServe: IPrismaService) {}
//   async checkIsUserExist(email: string): Promise<boolean> {
//     return false;
//     // return Boolean(await this.databaseService.user.findFirst({ where: { email } }));
//   }
//
//   login({ email, password }: UserLoginDto) {
//     return Promise.resolve(undefined);
//   }
//
//   forgotPassword(): Promise<void> {
//     return Promise.resolve(undefined);
//   }
//
//   logout(): Promise<void> {
//     return Promise.resolve(undefined);
//   }
//
//   refresh() {
//     return Promise.resolve(undefined);
//   }
//
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   async register({ email, password }: RegisterUserDto) {
//     // return databaseService.user.create({
//     //   data: { email, password },
//     //   select: { email: true, isBlocked: true, id: true },
//     // });
//   }
// }
