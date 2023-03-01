import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IPrismaService } from "@src/database";

import { RegisterUserDto, UserLoginDto } from "../dto";

export interface IAuthRepository {
  checkIsUserExist(email: string): Promise<boolean>;

  login(userLoginDto: UserLoginDto): Promise<void>;

  logout(): Promise<void>;

  register(registerUserDto: RegisterUserDto): Promise<User>;

  forgotPassword(): Promise<void>;

  refresh(): Promise<void>;
}

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaServe: IPrismaService) {}
  async checkIsUserExist(email: string): Promise<boolean> {
    return Boolean(await this.prismaServe.client.user.findFirst({ where: { name: email } }));
  }

  login({ email, password }: UserLoginDto) {
    // todo
    eval(`${email} - ${password}`);
    return Promise.resolve(undefined);
  }

  forgotPassword(): Promise<void> {
    return Promise.resolve(undefined);
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }

  refresh() {
    return Promise.resolve(undefined);
  }

  async register({ email, password }: RegisterUserDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.prismaServe.client.user.create({ data: { name: email, password } });
  }
}