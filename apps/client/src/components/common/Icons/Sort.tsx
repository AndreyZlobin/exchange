import { SvgIcon, SvgIconProps } from '@mui/material';
import { theme } from '@src/config/theme';

type SortDirection = 'asc' | 'desc';

export const MAP_OF_SORT: Record<SortDirection, SortDirection> = {
  asc: 'asc',
  desc: 'desc',
};

type SortIconProps = {
  sort?: SortDirection | boolean;
};

export const SortIcon = ({ sort, ...props }: SvgIconProps & SortIconProps) => {
  const { dark, light } = theme.palette.primary;
  const topFill = sort === MAP_OF_SORT.asc ? dark : light;
  const botFill = sort === MAP_OF_SORT.desc ? dark : light;

  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path fill={topFill} d="m8 4 2.5 3h-5L8 4Z" />
      <path fill={botFill} d="M8 12 5.5 9h5L8 12Z" />
    </SvgIcon>
  );
};
