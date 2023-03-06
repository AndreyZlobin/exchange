import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IPrismaService } from "@src/database";
import { PickPrimitives } from "@src/utils";

import { UserWithExcludedFields, UserWithoutPassword } from "../types";

type UserFieldsToSearch = Partial<PickPrimitives<User>>;

export interface IUserRepository {
  create(user: UserWithExcludedFields): Promise<UserWithoutPassword>;

  findAll(): Promise<User[]>;

  findUser(searchFiled: UserFieldsToSearch): Promise<User | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  // @inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {}

  async create(user: UserWithExcludedFields) {
    return this.prismaService.user.create({
      data: { ...user },
    });
  }
  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findUser(searchFiled: UserFieldsToSearch): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { ...searchFiled } });
  }
}
