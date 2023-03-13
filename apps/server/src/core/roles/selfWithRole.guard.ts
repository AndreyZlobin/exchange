import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserContext } from '@shared/context';
import { User } from '@src/core/user/types';

import { BaseRole } from './baseRole';

@Injectable()
export class SelfWithRoleGuard extends BaseRole implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const { userContext, params } = context
      .switchToHttp()
      .getRequest<{ userContext: UserContext; params: { id: string } }>();
    const { id } = params;
    const { userId, user } = (userContext || {}) as { userId: string; user: User };

    if (userId === id) return true;

    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];

    const userRole = user?.role;
    const hasRole = () => roles.includes(userRole);

    return user && userRole && hasRole();
  }
}
