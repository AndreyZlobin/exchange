import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { IUserRepository } from "../repository";

export interface IUserService {
  findUserByEmail(email: string): Promise<User | null>;
  getUserProfile(): boolean;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(TYPES.user.UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async findUserByEmail(email: string) {
    return this.userRepository.findUser({ name: email });
  }

  getUserProfile(): boolean {
    return true;
  }
}
