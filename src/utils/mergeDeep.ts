type MergeOptions = {
  arrayStrategy?: "replace" | "concat";
};

export function mergeDeep<T extends Record<string, any>>(
  target: T,
  source: T,
  options: MergeOptions = {},
): T {
  const arrayStrategy = options.arrayStrategy || "replace";
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    const k: keyof T = key;
    const targetValue = result[k];
    const sourceValue = source[k];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      const mergedArray =
        arrayStrategy === "concat" ? targetValue.concat(sourceValue) : sourceValue;

      result[k] = mergedArray;
    } else if (
      typeof targetValue === "object" &&
      typeof sourceValue === "object" &&
      targetValue !== null &&
      sourceValue !== null
    ) {
      result[k] = mergeDeep(targetValue, sourceValue, options);
    } else {
      result[k] = sourceValue;
    }
  });

  return result as T;
}
