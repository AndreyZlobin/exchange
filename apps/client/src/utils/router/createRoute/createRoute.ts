import { RouteObject } from 'react-router-dom';

interface CreateRouteParams extends Omit<RouteObject, 'children'> {
  // eslint-disable-next-line no-use-before-define
  children?: RouteData[];
}

export type CreateRoute = (
  name: string,
  params: CreateRouteParams,
) => CreateRouteParams & { name: string };

export const createRoute: CreateRoute = (name, params) => ({
  ...params,
  name,
});

export type RouteData = ReturnType<typeof createRoute>;
