import { DateType } from "../index";
import { setCurrentHoursToDate } from "../setCurrentHoursToDate";

export const getISOTimeWithOffset = (date: DateType, offset = 0): string => {
  const currentTime = setCurrentHoursToDate(date);
  const milliseconds = currentTime.getMilliseconds();

  return new Date(currentTime.setMilliseconds(milliseconds + offset)).toISOString();
};
