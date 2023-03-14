import { isDate } from '../isDate';
import { DateType } from '../types';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

const UTC_OPTION: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
};

const LOCALE = 'ru';

const formatDateToShortViewByLocal = Intl.DateTimeFormat(LOCALE, DATE_OPTIONS).format;

const formatDateToShortViewByUTC = Intl.DateTimeFormat(LOCALE, {
  ...DATE_OPTIONS,
  ...UTC_OPTION,
}).format;

const formatDateToFullViewByLocal = Intl.DateTimeFormat(LOCALE, {
  ...DATE_OPTIONS,
  ...TIME_OPTIONS,
}).format;

const formatDateToFullViewByUTC = Intl.DateTimeFormat(LOCALE, {
  ...DATE_OPTIONS,
  ...TIME_OPTIONS,
  ...UTC_OPTION,
}).format;

type DateFormatOptions = {
  withLocal?: boolean;
  withTime?: boolean;
};

type DateFormat = (date: DateType, options?: DateFormatOptions) => string;

const isoDateRegExp = new RegExp(/\dT\d.*[^Z]$/);

const checkISODateWithoutZ = (date: string | number) =>
  typeof date === 'string' && isoDateRegExp.test(date);

const optimizeDateString = (date: string | number): Date =>
  new Date(checkISODateWithoutZ(date) ? `${date}Z` : date);

export const dateFormat: DateFormat = (date, { withLocal, withTime } = {}): string => {
  if (!Boolean(date)) {
    return '';
  }

  const optimizedDate = date instanceof Date ? date : optimizeDateString(date);

  if (!isDate(optimizedDate)) {
    return '';
  }

  if (withLocal) {
    return withTime
      ? formatDateToFullViewByLocal(optimizedDate)
      : formatDateToShortViewByLocal(optimizedDate);
  }

  return withTime
    ? formatDateToFullViewByUTC(optimizedDate)
    : formatDateToShortViewByUTC(optimizedDate);
};
