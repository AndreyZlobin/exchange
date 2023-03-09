import { IBcryptService } from "@common/auth";
import { Roles } from "@src/core/roles/constants";

import { UserSettings, UserWithExcludedFields } from "../types";

export class UserEntity implements UserWithExcludedFields {
  public readonly name: string;
  public readonly role: Roles;
  public readonly password: string;
  public readonly settings: UserSettings;

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
