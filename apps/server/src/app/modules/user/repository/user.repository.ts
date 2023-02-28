import { TYPES } from "@DI/types";
import { User } from "@prisma/client";
import { IPrismaService } from "@src/infra";
import { inject, injectable } from "inversify";

import { RegisterUserDto } from "../../auth/dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  checkIsUserExist(email: string): Promise<boolean>;
  create(registerUserDto: RegisterUserDto): Promise<{ id: string }>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {}

  async create({ email, password }: RegisterUserDto) {
    return this.prismaService.client.user.create({
      // todo
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: { email, password },
      select: { id: true },
    });
  }

  async checkIsUserExist(email: string): Promise<boolean> {
    // todo
    return Boolean(await this.findByEmail(email));
  }

  async findByEmail(email: string) {
    // todo
    return this.prismaService.client.user.findFirst({ where: { name: email } });
  }
}
