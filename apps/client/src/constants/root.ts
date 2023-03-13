export const isDev = import.meta.env.DEV;

export const isProd = import.meta.env.PROD;

export const environment = import.meta.env.MODE;

export const TOOLBOX_CONNECT_URL = process.env.TOOLBOX_CONNECT_URL as string;

export const SENTRY_DNS = process.env.SENTRY_DNS as string;

export const SENTRY_RELEASE = process.env.SENTRY_RELEASE as string;

export const IS_PROD_STAND = process.env.STAND === 'prod';
