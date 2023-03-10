export type Primitive = boolean | number | string | bigint | symbol | undefined;

export type PickPrimitives<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Primitive ? K : never }[keyof T]
>;

export type ExcludePrimitives<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Primitive ? never : K }[keyof T]
>;

export * from './resolve-path';
