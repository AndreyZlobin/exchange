export const wordDeclension = <T extends string>(
  quantity: Readonly<number>,
  titles: Readonly<T[]>,
): string => {
  return titles[
    quantity % 10 === 1 && quantity % 100 !== 11
      ? 0
      : quantity % 10 >= 2 && quantity % 10 <= 4 && (quantity % 100 < 10 || quantity % 100 >= 20)
      ? 1
      : 2
  ];
};
