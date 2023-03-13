import { MINUTES_PER_HOUR, MSECONDS_PER_SECOND, SECONDS_PER_MINUTE } from '../../constants';

export function convertUTCDateToLocalDate(date: Date) {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * SECONDS_PER_MINUTE * MSECONDS_PER_SECOND,
  );

  const offset = date.getTimezoneOffset() / MINUTES_PER_HOUR;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}
