import { ROLES } from "@src/core/roles/constants";

export class CreateUserDto {
  email!: string;
  password!: string;
  role: Array<keyof typeof ROLES>;
}
