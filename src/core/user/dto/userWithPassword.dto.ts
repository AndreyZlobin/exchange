import { UserDto } from '@src/core/user/dto/user.dto';

import { User } from '../types';

export class UserWithPasswordDto extends UserDto implements User {
  readonly password: string;
}
