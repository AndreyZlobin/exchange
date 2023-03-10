import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentSystemDto } from '@src/core/paymentSystem/dto';
import { CreateUserDto, CreateUserSettingsDto, ResultUserDto, UserDto } from '@src/core/user/dto';
import { IPrismaService } from '@src/database';
import { PickPrimitives } from '@src/utils';

import { User } from '../types';
import { UserWithoutPassword } from '../types';

type UserFieldsToSearch = Partial<PickPrimitives<User>>;

export interface IUserRepository {
  create(
    user: CreateUserDto,
    settings: CreateUserSettingsDto,
    paymentSystems: CreatePaymentSystemDto[],
  ): Promise<UserDto>;

  findAll(): Promise<UserDto[]>;

  findUser(searchFiled: UserFieldsToSearch): Promise<ResultUserDto | null>;
}
@Injectable()
export class UserRepository implements IUserRepository {
  // @inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService
  private readonly defaultSelectedFields: Record<keyof UserWithoutPassword, true>;
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {
    this.defaultSelectedFields = this.prismaService.getSelectedField<UserWithoutPassword>([
      'role',
      'name',
      'isWork',
      'createdAt',
      'userBlacklistId',
      'settings',
      'deleted',
    ]);
  }

  async create(
    user: CreateUserDto,
    setting: CreateUserSettingsDto,
    paymentSystems: CreatePaymentSystemDto[],
  ) {
    return this.prismaService.user.create({
      data: {
        ...user,
        settings: { create: setting },
        wallet: { create: {} },
        paymentSystems: { createMany: { data: paymentSystems } },
      },
      select: { ...this.defaultSelectedFields },
    });
  }
  async findAll() {
    return this.prismaService.user.findMany({ select: { ...this.defaultSelectedFields } });
  }

  async findUser(searchFiled: UserFieldsToSearch): Promise<ResultUserDto | null> {
    return this.prismaService.user.findFirst({
      where: { ...searchFiled },
      include: { settings: true },
    });
  }

  async findUnique(searchFiled: UserFieldsToSearch): Promise<ResultUserDto | null> {
    return this.prismaService.user.findUnique({
      where: { ...searchFiled },
      include: { settings: true },
    });
  }
}
