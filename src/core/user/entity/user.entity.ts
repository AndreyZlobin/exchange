import { IBcryptService } from '@common/auth';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@src/core/roles/constants';
import { UserSettingsEntity } from '@src/core/user/entity/userSettings.entity';

import { UserWithExcludedFields } from '../types';

export class UserEntity implements UserWithExcludedFields {
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly role: Roles;
  public readonly password: string;
  @ApiProperty()
  public readonly settings: UserSettingsEntity;

  constructor(
    private readonly data: UserWithExcludedFields,
    private readonly bcryptService: IBcryptService,
  ) {
    const { name, role, password } = data;

    this.role = role;
    this.name = name;
    this.password = password;
  }

  async getUser(): Promise<UserWithExcludedFields> {
    const password = await this.bcryptService.hash(this.password);

    return { role: this.role, name: this.name, password };
  }
}
