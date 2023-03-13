export const filterListBySearch = <Data>(
  search: string,
  data: Data[],
  keysToSearch: (keyof Data)[],
): Data[] => {
  if (!search) {
    return data;
  }

  return data.filter((dataItem) =>
    keysToSearch.some((key) => String(dataItem[key]).toLowerCase().includes(search.toLowerCase())),
  );
};
