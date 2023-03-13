export function removeArrayItemsByArray<T>(array: Array<T>, toRemove: Array<T>) {
  return array.filter((v) => !toRemove.includes(v));
}
