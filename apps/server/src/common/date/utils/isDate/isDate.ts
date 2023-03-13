/**
 * @todo убрать es-lint disabled
 * */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isDate = (value: any): value is Date =>
  (value instanceof Date ||
    (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]')) &&
  !isNaN(+value);
