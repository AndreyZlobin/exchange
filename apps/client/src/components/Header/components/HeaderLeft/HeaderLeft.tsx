import { IconButton, Typography } from '@astral/ui';
import { ProductsIcon } from '@components/common/Icons';

import { HeaderLeftProductsStyled, HeaderLeftStyled } from './styles';

export const HeaderLeft = () => (
  <HeaderLeftStyled>
    <HeaderLeftProductsStyled>
      <IconButton variant="text">
        <ProductsIcon width={26} height={26} />
      </IconButton>
    </HeaderLeftProductsStyled>
    <Typography>Exchange</Typography>
  </HeaderLeftStyled>
);
