import {
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
} => {
  const result = useOriginQuery<TData, TError>({
    queryKey: key,
    queryFn: fnData,
    ...options,
  });

  const { isLoading: isOriginLoading, error, data, isFetching } = result;

  const isError = useMemo(() => error !== null, [error]);
  const isLoading = useMemo(() => isOriginLoading || isFetching, [isOriginLoading, isFetching]);

  return { isError, isLoading, data, error };
};
