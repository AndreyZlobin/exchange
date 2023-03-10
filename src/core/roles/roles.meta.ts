import { SetMetadata } from '@nestjs/common';

import type { Roles as RolesType } from './constants';

export const Roles = (...roles: RolesType[]) => SetMetadata('roles', roles);
