import { ForbiddenRoutes } from '../../roles/constants';
import { Role } from '../../roles/types';

export const checkIsRouteAllowed = (
  forbiddenRoutes: ForbiddenRoutes,
  userRoles: readonly Role[],
  name: string,
) => {
  const isPrivate = forbiddenRoutes[name];

  return !isPrivate ? true : userRoles.some((roleWithAccess) => isPrivate.includes(roleWithAccess));
};
