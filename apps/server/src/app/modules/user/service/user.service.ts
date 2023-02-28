import { injectable } from "inversify";

export interface IUserService {
  // createUser(input: CreateUserInput): Promise<>
  findUserByEmail(email: string): Promise<void>;
  findUserById(userId: string): Promise<void>;
  findUser(): Promise<void>;
}

@injectable()
export class UserService implements IUserService {
  findUser(): Promise<void> {
    return Promise.resolve(undefined);
  }

  findUserByEmail(email: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  findUserById(userId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
