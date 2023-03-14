import { ApiError, HTTP_ERRORS, INTERNAL_ERROR_INFO } from '@services/http';
import { AxiosError } from 'axios';

const createErrorTemplate = (
  error: AxiosError,
): {
  result: ReturnType<typeof ApiError.createResponseErrorTemplate>;
  httpErrorInfo: ReturnType<typeof ApiError.getHttpErrorInfo>;
} => {
  const messageData = error.response?.data as {
    message: string | Record<string, string>;
    statusCode: number;
  };
  const messageResult =
    typeof messageData.message === 'object'
      ? Object.values(messageData.message).join(' ')
      : messageData.message;

  const status = error.response?.status || INTERNAL_ERROR_INFO.code;
  const httpErrorInfo = ApiError.getHttpErrorInfo(status);
  const message = messageResult || httpErrorInfo.message;

  return {
    result: ApiError.createResponseErrorTemplate(
      httpErrorInfo.code,
      error.response?.config.url || '',
      error.response?.data || {},
    ),
    httpErrorInfo: { ...httpErrorInfo, message },
  };
};

export const normalizeApiError = (error: AxiosError) => {
  if (error.isAxiosError) {
    const { result, httpErrorInfo } = createErrorTemplate(error);

    return Promise.reject(new ApiError(result, httpErrorInfo.message));
  } else {
    const httpErrorInfo = ApiError.getHttpErrorInfo(HTTP_ERRORS.INTERNAL_ERROR_HTTP_CODE);
    const result = ApiError.createResponseErrorTemplate(
      httpErrorInfo.code,
      error.response?.config.url || '',
      error.response?.data || {},
    );

    return Promise.reject(new ApiError(result, httpErrorInfo.message));
  }
};
