const format = Intl.DateTimeFormat('ru', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}).format;

/**
 * @description получаем текстовое смещение таймзоны в формате чч:мм:сс
 */
export const getCurrentTimezoneOffset = () => format(0);
