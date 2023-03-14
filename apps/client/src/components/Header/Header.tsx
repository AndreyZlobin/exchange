import { UserProfile } from '@components/common/UserProfile';

import { HeaderLeft } from './components';
import { HeaderInner, HeaderRightWrapper, HeaderWrapper } from './styles';

export const Header = () => (
  <HeaderWrapper>
    <HeaderInner>
      <HeaderLeft />
      <HeaderRightWrapper>
        <UserProfile />
      </HeaderRightWrapper>
    </HeaderInner>
  </HeaderWrapper>
);
