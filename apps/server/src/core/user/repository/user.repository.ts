import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { IPrismaService } from "@src/database";
import { PickPrimitives } from "@src/utils";

import { User } from "../types";
import { UserWithExcludedFields, UserWithoutPassword } from "../types";

type UserFieldsToSearch = Partial<PickPrimitives<User>>;

export interface IUserRepository {
  create(user: UserWithExcludedFields): Promise<UserWithoutPassword>;

  findAll(): Promise<UserWithoutPassword[]>;

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
  async findAll(): Promise<UserWithoutPassword[]> {
    return this.prismaService.user.findMany({
      select: this.prismaService.getSelectedField<UserWithoutPassword>([
        "id",
        "name",
        "active",
        "role",
        "deleted",
      ]),
    });
  }

  async findUser(searchFiled: UserFieldsToSearch): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { ...searchFiled } });
  }

  async findUnique(searchFiled: UserFieldsToSearch): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { ...searchFiled } });
  }
}
