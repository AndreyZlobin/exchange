import { IconButton, OverflowTypography, styled } from '@astral/ui';
import { Box } from '@mui/material';

export const PageHeaderWrapper = styled(Box)`
  padding: ${({ theme }) => theme.spacing(6)};

  border-bottom: ${({ theme }) => '1px solid ' + theme.palette.grey[300]};
  background-color: ${({ theme }) => theme.palette.background.element};

  display: grid;
  grid-column-gap: ${({ theme }) => theme.spacing(2)};
  grid-row-gap: ${({ theme }) => theme.spacing(6)};
  justify-content: space-between;
  align-items: center;
`;

export const PageHeaderBackBtn = styled(IconButton)`
  grid-area: ${1};
`;
export const PageHeaderActions = styled.div`
  grid-area: ${1};
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing(1)};
`;

export const PageHeaderTitle = styled(OverflowTypography)`
  grid-area: ${1};
  display: -webkit-box;
`;
