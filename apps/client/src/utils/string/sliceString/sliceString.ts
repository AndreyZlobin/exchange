interface SliceStringProps {
  string: string;
  beginIndex?: number;
  endIndex: number;
}

export const sliceString = ({ string, beginIndex = 0, endIndex }: SliceStringProps) => {
  return `${string.slice(beginIndex, endIndex)}${string.length > endIndex ? '...' : ''}`;
};
