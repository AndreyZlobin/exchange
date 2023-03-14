import { ApiError, HTTP_ERRORS } from '@services/http';
import { notify } from '@utils/notify';

const errorStatusExceptionList = [HTTP_ERRORS.UNAUTHORIZED_HTTP_CODE];

export const errorHandler = <T extends ApiError | Error | unknown>(error: T) => {
  if (!(error instanceof ApiError)) {
    return;
  }

  if (!errorStatusExceptionList.includes(error.status)) {
    notify.error(error.message);
  }
};
