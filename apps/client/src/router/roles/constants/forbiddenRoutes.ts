import { Role } from '../types';
// import { ROLES } from './roles';

export type ForbiddenRoutes = Record<string, readonly Role[]>;

// const { recruiter, administrator, superAdmin } = ROLES;

export const FORBIDDEN_ROUTES: ForbiddenRoutes = {};
