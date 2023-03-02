import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IPrismaService } from "@src/database";
import { PickPrimitives } from "@src/utils";

import { CreateUserDto } from "../dto";
import { UserEntity } from "../entity";

type UserFieldsToSearch = Partial<PickPrimitives<User>>;

export interface IUserRepository {
  create(registerUserDto: CreateUserDto): Promise<{ id: string }>;

  findAll(): Promise<User[]>;

  findUser(searchFiled: UserFieldsToSearch): Promise<User | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  // @inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {}

  async create({ email, password, role }: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = new UserEntity({ name: email, password, role });

    return this.prismaService.user.create({ data: user });
  }
  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findUser(searchFiled: UserFieldsToSearch): Promise<User | null> {
    return this.prismaService.user.findFirst({ where: { ...searchFiled } });
  }
}
