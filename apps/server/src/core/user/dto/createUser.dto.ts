import { Roles } from "@src/core/roles/constants";

export class CreateUserDto {
  email!: string;
  password!: string;
  role: Roles[];
}
