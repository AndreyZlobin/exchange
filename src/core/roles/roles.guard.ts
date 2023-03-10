import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserContext } from '@shared/context';
import { User } from '@src/core/user/types';

import { BaseRole } from './baseRole';

@Injectable()
export class RolesGuard extends BaseRole implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const { userContext } = context
      .switchToHttp()
      .getRequest<{ userContext: UserContext; params: { id: string } }>();
    const { user } = (userContext || {}) as { userId: string; user: User };

    const userRole = user?.role;

    const hasRole = () => roles.includes(userRole);

    return user && userRole && hasRole();
  }
}
