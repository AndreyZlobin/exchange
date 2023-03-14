import { Profile } from '@astral/ui';
import { MenuItem, Typography } from '@astral/ui';
import { AuthContext } from '@modules/Auth/components/AuthContext';
import { theme } from '@src/config/theme';
import { useContext } from 'react';

import { MenuWrapper } from './styles';

export const UserProfile = () => {
  const { handleLogout } = useContext(AuthContext);
  const onLogout = async () => {
    try {
      return await handleLogout();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return (
    <Profile
      displayName={'Test_name'}
      avatar={{
        alt: 't',
        children: 'TN',
      }}
      menu={(props) => (
        <MenuWrapper {...props}>
          <MenuItem onClick={() => {}}>Личный кабинет</MenuItem>
          <MenuItem onClick={onLogout}>
            <Typography color={theme.palette.red[900]}>Выйти</Typography>
          </MenuItem>
        </MenuWrapper>
      )}
    />
  );
};
