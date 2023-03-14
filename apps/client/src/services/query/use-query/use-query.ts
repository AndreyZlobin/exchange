import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery as useOriginQuery,
  UseQueryOptions as UseOriginQueryOptions,
} from '@tanstack/react-query';
import { useMemo } from 'react';

export type QueryKey = readonly unknown[];

export type UseQueryOptions<TData, TError = unknown> = UseOriginQueryOptions<TData, TError>;

export const useQuery = <TData, TError = unknown>(
  key: QueryKey,
  fnData: () => Promise<TData>,
  options: UseQueryOptions<TData, TError> = {},
): {
  isLoading: boolean;
  isError: boolean;
  error: TError | null;
  data: TData | undefined;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<TData, TError>>;
} => {
  const result = useOriginQuery<TData, TError>({
    queryKey: key,
    queryFn: fnData,
    ...options,
  });

  const { isLoading: isOriginLoading, error, data, isFetching, refetch } = result;

  const isError = useMemo(() => error !== null, [error]);
  const isLoading = useMemo(() => isOriginLoading || isFetching, [isOriginLoading, isFetching]);

  return { isError, isLoading, data, error, refetch };
};
