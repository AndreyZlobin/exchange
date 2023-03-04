import { BcryptService } from "@common/auth";
import { User } from "@prisma/client";
import { Roles } from "@src/core/roles/constants";

type UserWithExcludedFields = Omit<User, "id" | "deleted">;
export class UserEntity implements UserWithExcludedFields {
  private readonly b = new BcryptService();
  public readonly name: string;
  public readonly role: Roles[];
  public readonly active: boolean;
  public readonly password: string;
  constructor(private readonly data: UserWithExcludedFields) {
    const { active, name, role, password } = data;

    this.role = role;
    this.name = name;
    this.active = active;
    this.password = password;
  }
}
