import { useInterceptors } from '@hooks/useInterceptor';
import { normalizeApiError } from '@services/http/axios/utils/normalizeApiError';
import { axiosClient } from '@services/httpClient/axiosClient';
import { getAccessToken } from '@services/httpClient/utils/getAccessToken';
import { getRefreshToken } from '@services/httpClient/utils/getRefreshToken';
import { removeTokens, updateTokens } from '@services/httpClient/utils/updateTokens';
import { useMutate } from '@services/query';
import { InternalAxiosRequestConfig } from 'axios';
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { useRouterUtils } from '../../../../../router/hooks/useRouterUtils';
import { MakeRefreshDto, UserLoginDto } from '../../../../api';
import { apiClient } from '../../../../apiClient/apiClient';
import { AUTH_ROUTES_PATHS } from '../../router';

export interface AuthContextProps {
  isLoggedIn: boolean;
  isLoginLoading: boolean;
  isLoginRefresh: boolean;
  isLogoutLoading: boolean;
  handleLogin(data: UserLoginDto): Promise<void>;
  handleLogout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isLoginLoading: false,
  isLoginRefresh: false,
  handleLogin(): Promise<void> {
    return Promise.resolve();
  },
  handleLogout(): Promise<void> {
    return Promise.resolve();
  },
  isLogoutLoading: false,
});

export const useRefreshToken = () => {
  return useMutate(async (requestBody: MakeRefreshDto) =>
    apiClient.auth.authControllerRefresh({ requestBody }),
  );
};

export const useLoginUser = () => {
  return useMutate(async (requestBody: UserLoginDto) =>
    apiClient.auth.authControllerLogin({ requestBody }),
  );
};

export const useLogoutUser = () => {
  return useMutate(async () => apiClient.auth.authControllerLogout());
};

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) => {
  const { location, handleNavigate, getSearchParams } = useRouterUtils();

  const backUrl = getSearchParams('redirectBack');

  const { mutateAsync, isLoading: isLoginLoading } = useLoginUser();
  const { mutateAsync: handleRefresh, isLoading: isLoginRefresh } = useRefreshToken();
  const { mutateAsync: logoutMutate, isLoading: isLogoutLoading } = useLogoutUser();

  const [isLoggedIn, setUserState] = useState(Boolean(getAccessToken()));

  const navigateToAuthPage = useCallback(() => {
    return handleNavigate(AUTH_ROUTES_PATHS.authBasePath, {
      search: { redirectBack: location.pathname || '' },
    });
  }, [location]);

  const handleRefreshToken = async () => {
    const token = getRefreshToken() as string;

    try {
      return await handleRefresh({ refreshToken: token });
    } catch (e) {
      setUserState(false);
      navigateToAuthPage();
      return Promise.reject(e);
    }
  };

  const handleLogin = async (loginData: UserLoginDto) => {
    try {
      const { accessToken, refreshToken } = await mutateAsync(loginData);

      updateTokens({ accessToken, refreshToken });
      handleNavigate(backUrl || '/');
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutate({});
      removeTokens();
      handleNavigate(AUTH_ROUTES_PATHS.authBasePath);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  useEffect(() => {
    const hasRefreshToken = Boolean(getRefreshToken());

    if (isLoggedIn && location.pathname.match(AUTH_ROUTES_PATHS.authBasePath)) {
      handleNavigate(backUrl || '/');
    }

    if (!isLoggedIn && hasRefreshToken) {
      handleRefreshToken().then(({ accessToken, refreshToken }) => {
        updateTokens({ accessToken, refreshToken });
        setUserState(true);
      });
    }

    if (!isLoggedIn && !location.pathname.match(AUTH_ROUTES_PATHS.authBasePath)) {
      navigateToAuthPage();
    }
  }, [isLoggedIn]);

  useInterceptors({
    client: axiosClient,
    onRequest: async (config) => {
      const hasAccessToken = Boolean(getAccessToken());
      const hasRefreshToken = Boolean(getRefreshToken());

      if (config.url?.includes('auth/login')) {
        return config;
      }

      if (!hasAccessToken && !hasRefreshToken) {
        setUserState(false);
        navigateToAuthPage();
        return Promise.reject(new Error('Здесь токенов нет'));
      }

      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${getAccessToken()}`;

      return config;
    },
    onResponseError: async (errorConfig) => {
      const originalRequest = errorConfig.config as InternalAxiosRequestConfig;
      const retry = (originalRequest as unknown as { _retry: boolean })?._retry;
      const hasRefreshToken = Boolean(getRefreshToken());

      const isUnauthorized = errorConfig.response?.status === 401;

      if (!hasRefreshToken && isUnauthorized) {
        navigateToAuthPage();
      }
      if (isUnauthorized && !retry) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        originalRequest._retry = true;
        try {
          const { accessToken, refreshToken } = await handleRefreshToken();

          updateTokens({ accessToken, refreshToken });
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          setUserState(true);

          return await axiosClient.instance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return normalizeApiError(errorConfig);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoginLoading,
        isLoginRefresh,
        handleLogout,
        isLogoutLoading,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
