import {
  dateFormat,
  dateToISOString,
  DateType,
  getCurrentFormattedTime,
  getCurrentTimezoneOffset,
  getDifferenceInDays,
  getISOTimeWithOffset,
  resetHoursToEnd,
  resetHoursToStart,
  setCurrentHoursToDate,
  subDays,
  subYears,
} from './utils';

type IDateToString = (date: DateType) => string;

export interface IDateService {
  toShortReadableByUTC: IDateToString;
  toShortReadableByLocal: IDateToString;
  toFullReadableByUTC: IDateToString;
  toFullReadableByLocal: IDateToString;
  toShortISO: IDateToString;
  toFullISO: IDateToString;
  toShortISOWithTimezoneOffset: IDateToString;
  toFullISOWithTimezoneOffset: IDateToString;
  differenceInDays: (dateA: DateType, dateB: DateType) => number;
  subYears: (date: DateType, yearsAgo: number) => Date;
  addDays: (date: DateType, days: number) => Date;
  subDays: (date: DateType, days: number) => Date;
  resetHoursToStart: (date: DateType) => Date;
  resetHoursToEnd: (date: DateType) => Date;
  setCurrentHoursToDate: (date: Date) => Date;
  currentFormattedTime: () => string;
  getISOTimeWithOffset: (date: DateType, offset?: number) => string;
  getSubmitDateWithOffset: (
    date: DateType,
    minDate: DateType,
    maxDate: DateType,
    offset: number,
  ) => string;
  getCurrentTimezoneOffset: () => string;
}

const getSubmitDateWithOffset = (
  date: DateType,
  minDate: DateType,
  maxDate: DateType,
  offset: number,
) => {
  const currentDateToUnix = resetHoursToStart(date).getTime();

  if (resetHoursToStart(minDate).getTime() === currentDateToUnix) {
    return getISOTimeWithOffset(date, offset);
  }

  if (resetHoursToStart(maxDate).getTime() === currentDateToUnix) {
    return getISOTimeWithOffset(date, -offset);
  }

  return getISOTimeWithOffset(date, 0);
};

export class DateService implements IDateService {
  toShortReadableByUTC(date: DateType): string {
    return dateFormat(date);
  }

  toShortReadableByLocal(date: DateType): string {
    return dateFormat(date, { withLocal: true });
  }

  toFullReadableByUTC(date: DateType): string {
    return dateFormat(date, { withTime: true });
  }

  toFullReadableByLocal(date: DateType): string {
    return dateFormat(date, { withTime: true, withLocal: true });
  }

  toShortISO(date: DateType): string {
    return dateToISOString(date);
  }

  toFullISO(date: DateType): string {
    return dateToISOString(date, { withTime: true });
  }

  toShortISOWithTimezoneOffset(date: DateType): string {
    return dateToISOString(date, { withLocalOffset: true });
  }

  toFullISOWithTimezoneOffset(date: DateType): string {
    return dateToISOString(date, { withTime: true, withLocalOffset: true });
  }

  differenceInDays(dateA: DateType, dateB: DateType): number {
    return getDifferenceInDays(dateA, dateB);
  }

  currentFormattedTime(): string {
    return getCurrentFormattedTime();
  }

  addDays(date: DateType, days: number): Date {
    return subDays(date, -days);
  }

  getISOTimeWithOffset(date: DateType, offset = 0): string {
    return getISOTimeWithOffset(resetHoursToStart(date), offset);
  }

  subYears(date: DateType, years: number): Date {
    return subYears(date, years);
  }

  subDays(date: DateType, days: number): Date {
    return subDays(date, days);
  }

  resetHoursToStart(date: DateType): Date {
    return resetHoursToStart(date);
  }

  resetHoursToEnd(date: DateType): Date {
    return resetHoursToEnd(date);
  }

  setCurrentHoursToDate(date: DateType): Date {
    return setCurrentHoursToDate(date);
  }

  getSubmitDateWithOffset(
    date: DateType,
    minDate: DateType,
    maxDate: DateType,
    offset: number,
  ): string {
    return getSubmitDateWithOffset(date, minDate, maxDate, offset);
  }

  getCurrentTimezoneOffset(): string {
    return getCurrentTimezoneOffset();
  }
}
