import { ACCESS_TOKEN_KEY } from '@services/httpClient/constants/accessTokenKey';
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);
