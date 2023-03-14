export const HTTP_ERRORS = {
  UNAUTHORIZED_HTTP_CODE: 401,
  FORBIDDEN_HTTP_CODE: 403,
  BAD_REQUEST_HTTP_CODE: 400,
  NOT_FOUND_HTTP_CODE: 404,
  INTERNAL_ERROR_HTTP_CODE: 500,
  UNAVAILABLE_LEGAL_REASONS: 451,
};

const {
  UNAUTHORIZED_HTTP_CODE,
  FORBIDDEN_HTTP_CODE,
  BAD_REQUEST_HTTP_CODE,
  NOT_FOUND_HTTP_CODE,
  INTERNAL_ERROR_HTTP_CODE,
  UNAVAILABLE_LEGAL_REASONS,
} = HTTP_ERRORS;

export const BAD_REQUEST_ERROR_INFO = {
  code: BAD_REQUEST_HTTP_CODE,
  message: 'Ошибка запроса',
};

export const FORBIDDEN_ERROR_INFO = {
  code: FORBIDDEN_HTTP_CODE,
  message: 'Отказано в доступе',
};

export const NOT_FOUND_ERROR_INFO = {
  code: NOT_FOUND_HTTP_CODE,
  message: 'Сервер не отвечает',
};

export const UNAUTHORIZED_HTTP_INFO = {
  code: UNAUTHORIZED_HTTP_CODE,
  message: 'Ошибка авторизации',
};

export const UNAVAILABLE_LEGAL_REASONS_INFO = {
  code: UNAVAILABLE_LEGAL_REASONS,
  message: 'Не подписано соглашение об использовании сервиса',
};

export const INTERNAL_ERROR_INFO = {
  code: INTERNAL_ERROR_HTTP_CODE,
  message: 'Неизвестная ошибка',
};

export const HTTP_ERRORS_INFO = {
  [UNAUTHORIZED_HTTP_CODE]: UNAUTHORIZED_HTTP_INFO,
  [BAD_REQUEST_HTTP_CODE]: BAD_REQUEST_ERROR_INFO,
  [FORBIDDEN_HTTP_CODE]: FORBIDDEN_ERROR_INFO,
  [INTERNAL_ERROR_HTTP_CODE]: INTERNAL_ERROR_INFO,
  [UNAVAILABLE_LEGAL_REASONS]: UNAVAILABLE_LEGAL_REASONS_INFO,
};
