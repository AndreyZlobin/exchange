import { IBcryptService } from '@common/auth';
import { TYPES } from '@DI/types';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpException } from '@shared/exceptions';
import { ROLES } from '@src/core/roles/constants';

import { CreateUserDto } from '../dto';
import { UserEntity, UserSettingsEntity } from '../entity';
import { IUserRepository } from '../repository';
import { User, UserWithoutPassword } from '../types';

export interface IUserService {
  findByName(name: string): Promise<User | null>;
  getUserProfile(): boolean;
  create(user: CreateUserDto): Promise<UserWithoutPassword>;
  getAll(): Promise<UserWithoutPassword[]>;
}

const { admin, superadmin, provider } = ROLES;

@Injectable()
export class UserService implements IUserService {
  private readonly allowedRoles = [admin, superadmin, provider] as const;

  constructor(
    @Inject(TYPES.user.UserRepository) private readonly userRepository: IUserRepository,
    @Inject(TYPES.services.BcryptService) private readonly bcryptService: IBcryptService,
  ) {}

  async findByName(name: string) {
    return this.userRepository.findUser({ name });
  }

  async getAll(): Promise<UserWithoutPassword[]> {
    return this.userRepository.findAll();
  }

  private async checkIsUserExist(name): Promise<boolean> {
    return Boolean(await this.findByName(name));
  }

  async create({ name, password, role }: CreateUserDto): Promise<UserWithoutPassword> {
    // req.user.role
    const currentRole = 'admin';

    if (!this.allowedRoles.includes(currentRole)) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }

    const isUserExist = await this.checkIsUserExist(name);

    if (isUserExist) {
      const errorMessage = `Пользователь с логином ${name} уже существует`;
      // currentRole === 'provider'
      //   ? 'Ошибка создания пользователя'

      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const userSettings = UserSettingsEntity.getDefaultSettings;
    const userEntity = new UserEntity({ name, password, role }, this.bcryptService);
    const user = await userEntity.getUser();

    return this.userRepository.create(user, userSettings);
  }

  getUserProfile(): boolean {
    return true;
  }
}
