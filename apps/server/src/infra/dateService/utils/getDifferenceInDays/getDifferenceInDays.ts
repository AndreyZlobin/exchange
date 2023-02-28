import { MSECONDS_PER_DAY } from "../../constants";
import { DateType } from "../types";

export const getDifferenceInDays = (dateOne: DateType, dateTwo: DateType): number => {
  const dateStart = new Date(dateOne);
  const dateEnd = new Date(dateTwo);

  dateStart.setHours(0, 0, 0, 0);
  dateEnd.setHours(0, 0, 0, 0);

  const differenceInMSec = +dateStart - +dateEnd;

  return Math.floor(differenceInMSec / MSECONDS_PER_DAY);
};
