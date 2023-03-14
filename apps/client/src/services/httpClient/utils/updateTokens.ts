import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '../constants/accessTokenKey';
import { REFRESH_TOKEN_KEY } from '../constants/refreshTokenKey';

const setCookie = (key: string, token: string, expiresIn: number) => {
  Cookies.set(key, token, {
    sameSite: 'Lax',
    expires: new Date(+new Date() + expiresIn),
  });
};

const removeCookie = (key: string) => {
  Cookies.remove(key);
};

type UpdateTokensOptions = {
  accessToken: string;
  refreshToken: string;
  expires?: number;
};

const DAY_IN_MSEC = 60 * 60 * 24 * 1000;

export const updateTokens = ({
  accessToken,
  refreshToken,
  expires = 60 * 24 * 1000,
}: UpdateTokensOptions): void => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, expires);
  setCookie(REFRESH_TOKEN_KEY, refreshToken, 7 * DAY_IN_MSEC);
};

export const removeTokens = (): void => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};
