import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '@src/database';

import { EditUserSettingsDto, UserDto, UserSettingsDto } from '../dto';

export interface IUserSettingsRepository {
  edit(userId: string, editSettingsDto: EditUserSettingsDto): Promise<UserDto>;
  getById(userId: string): Promise<UserSettingsDto>;
}
@Injectable()
export class UserSettingsRepository implements IUserSettingsRepository {
  private readonly defaultSelectedFields: Record<keyof UserDto, true>;
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {
    this.defaultSelectedFields = this.prismaService.getSelectedField<UserDto>([
      'createdAt',
      'deleted',
      'name',
      'role',
      'userBlacklistId',
      'settings',
    ]);
  }

  async edit(userId: string, editSettingsDto: EditUserSettingsDto): Promise<UserDto> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { settings: { update: editSettingsDto } },
      select: { ...this.defaultSelectedFields },
    });
  }

  getById(userId: string): Promise<UserSettingsDto> {
    return this.prismaService.userSettings.findUnique({ where: { userId } });
  }
}
