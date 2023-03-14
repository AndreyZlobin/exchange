import { styled } from '@astral/ui';

export const HeaderLeftStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLeftProductsStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing(3)};

  cursor: pointer;
`;
