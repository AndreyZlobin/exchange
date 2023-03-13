import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserPaymentSystemDto } from '@src/core/paymentSystem/dto';
import {
  CreateUserDto,
  CreateUserSettingsDto,
  UserDto,
  UserWithPasswordDto,
} from '@src/core/user/dto';
import { IPrismaService } from '@src/database';
import { PickPrimitives } from '@src/utils';

import { UserWithoutPassword } from '../types';

type UserFieldsToSearch = Partial<PickPrimitives<UserDto>>;

export interface IUserRepository {
  create(
    user: CreateUserDto,
    settings: CreateUserSettingsDto,
    paymentSystems: CreateUserPaymentSystemDto[],
  ): Promise<UserDto>;

  findAll(): Promise<UserDto[]>;

  findUser(searchFiled: UserFieldsToSearch): Promise<UserWithPasswordDto | null>;
}
@Injectable()
export class UserRepository implements IUserRepository {
  private readonly defaultSelectedFields: Record<keyof UserWithoutPassword, true>;
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {
    this.defaultSelectedFields = this.prismaService.getSelectedField<UserWithoutPassword>([
      'role',
      'name',
      'createdAt',
      'userBlacklistId',
      'settings',
      'deleted',
    ]);
  }

  async create(
    user: CreateUserDto,
    setting: CreateUserSettingsDto,
    paymentSystems: CreateUserPaymentSystemDto[],
  ): Promise<UserDto> {
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
  async findAll(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({ select: { ...this.defaultSelectedFields } });
  }

  async findUser(searchFiled: UserFieldsToSearch): Promise<UserWithPasswordDto | null> {
    return this.prismaService.user.findFirst({
      where: { ...searchFiled },
      include: { settings: true },
    });
  }

  async findUnique(searchFiled: UserFieldsToSearch): Promise<UserWithPasswordDto | null> {
    return this.prismaService.user.findUnique({
      where: { ...searchFiled },
      include: { settings: true },
    });
  }
}
