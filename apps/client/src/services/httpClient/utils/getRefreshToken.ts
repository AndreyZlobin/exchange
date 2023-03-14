import { REFRESH_TOKEN_KEY } from '@services/httpClient/constants/refreshTokenKey';
import Cookies from 'js-cookie';

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);
