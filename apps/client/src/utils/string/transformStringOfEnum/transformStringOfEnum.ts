interface TransformStringOfEnumParams {
  stringOfEnum: string;
  mapped: {
    [x: string]: string;
  };
  separator?: string;
}

export function transformStringOfEnum({
  stringOfEnum,
  mapped,
  separator = ', ',
}: TransformStringOfEnumParams) {
  return (
    (typeof stringOfEnum === 'string' &&
      stringOfEnum
        .split(separator)
        .map((enumElement) => {
          return Object.entries(mapped).find(([key]) => key == enumElement)?.[1];
        })
        .filter((elem) => elem)
        .join(separator)) ||
    ''
  );
}
