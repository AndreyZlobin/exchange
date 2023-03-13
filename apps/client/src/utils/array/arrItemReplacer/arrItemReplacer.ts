export function arrItemReplacer<T extends object>(
  list: T[],
  newItem: T,
  // eslint-disable-next-line no-use-before-define
  value: T[typeof findKey],
  findKey: keyof T,
): T[] {
  if (!list?.length || !Object.keys(newItem).length || !value) {
    return list;
  }

  const index = list.findIndex((item) => item[findKey] === value);

  return index >= 0
    ? [...list.slice(0, index), newItem, ...list.slice(index + 1, list.length)]
    : list;
}
