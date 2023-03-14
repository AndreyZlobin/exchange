import { useMutation, UseMutationOptions as UseOriginMutateOptions } from '@tanstack/react-query';
import { useMemo } from 'react';

export type UseMutateOptions<
  TData,
  TArguments = unknown,
  TError = unknown,
  TContext = unknown,
> = UseOriginMutateOptions<TData, TArguments, TError, TContext>;

export const useMutate = <TData, TArguments = unknown, TError = unknown, TContext = unknown>(
  mutationFn: (args: TArguments) => Promise<TData>,
  options?: UseMutateOptions<TData, TError, TArguments, TContext>,
) => {
  const result = useMutation({ mutationFn, ...(options || {}) });

  const { error } = result;

  const isError = useMemo(() => error !== null, [error]);

  return { ...result, isError };
};
