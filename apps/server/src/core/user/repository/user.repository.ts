import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IPrismaService } from "@src/database";
import { PickPrimitives } from "@src/utils";

import { CreateUserDto } from "../../auth/dto";

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create({ email, password, role }: CreateUserDto) {
    return this.prismaService.user.create({
      // todo
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: { email, password, role },
      //   select: { id: true },
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll() {
    // return this.prismaService.client.user.findMany();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findUser(searchFiled: UserFieldsToSearch): Promise<User | null> {
    // return this.prismaService.client.user.findFirst({ where: { ...searchFiled } });
  }
}
