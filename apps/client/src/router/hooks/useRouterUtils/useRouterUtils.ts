import { searchParamsCreator } from '@utils/string';
import { useCallback } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface NavigateHandlerParams {
  setPrevPath?: boolean;
  search?: Record<string, string | string[]>;
}

export const useRouterUtils = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const getRouteParam = useCallback((key: string) => routeParams[key], [routeParams]);

  const getSearchParams = useCallback((param: string) => searchParams.get(param), [searchParams]);
  const removeSearchParams = useCallback(
    (param: string) => {
      searchParams.delete(param);
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const handleNavigate = useCallback(
    (pathname: string, { search }: NavigateHandlerParams = {}) => {
      const params = search ? searchParamsCreator(search) : undefined;

      navigate({ pathname, search: params });
    },
    [navigate],
  );

  return {
    location,
    handleNavigate,
    navigate,
    searchParams,
    setSearchParams,
    getSearchParams,
    getRouteParam,
    removeSearchParams,
  };
};
