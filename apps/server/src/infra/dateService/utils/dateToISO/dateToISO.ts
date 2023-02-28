import { DateType } from "../types";

type DateToISOStringOptions = {
  withTime?: boolean;
  withLocalOffset?: boolean;
};

type IDateToISOString = (date: DateType, options?: DateToISOStringOptions) => string;

export const dateToISOString: IDateToISOString = (date, { withTime, withLocalOffset } = {}) => {
  const privateDate = new Date(date);

  if (withLocalOffset) {
    privateDate.setUTCMinutes(privateDate.getUTCMinutes() - privateDate.getTimezoneOffset());
  }

  const textTimeZoneOptimizedDate = privateDate.toISOString();

  return withTime ? textTimeZoneOptimizedDate : textTimeZoneOptimizedDate.replace(/T.*Z/, "");
};
