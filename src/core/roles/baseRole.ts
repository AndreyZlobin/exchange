import { Injectable } from '@nestjs/common';

import { ROLES, Roles as RolesType } from './constants';
import { Roles } from './roles.meta';

@Injectable()
export class BaseRole {
  static readonly roles = ROLES;
  static Roles(...roles: RolesType[]) {
    return Roles(...roles);
  }
}
