import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';

import { EditUserSettingsDto, UserDto, UserSettingsDto } from '../dto';
import { UserSettingsEntity } from '../entity';
import { IUserSettingsRepository } from '../repository';

export interface IUserSettingsService {
  edit(userId: string, editSettingsDto: EditUserSettingsDto): Promise<UserDto>;
  getById(userId: string): Promise<UserSettingsDto>;
}
@Injectable()
export class UserSettingsService implements IUserSettingsService {
  constructor(
    @Inject(TYPES.userSettings.UserSettingRepository)
    private readonly userSettingRepository: IUserSettingsRepository,
  ) {}
  edit(userId: string, editSettingsDto: EditUserSettingsDto): Promise<UserDto> {
    const { settings } = new UserSettingsEntity(editSettingsDto);

    return this.userSettingRepository.edit(userId, settings);
  }

  getById(userId: string): Promise<UserSettingsDto> {
    return this.userSettingRepository.getById(userId);
  }
}
