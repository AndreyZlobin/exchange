import { DateType } from "../types";

export const subYears = (date: DateType, yearsAgo: number) => {
  const localDate = new Date(date);

  return new Date(localDate.setUTCFullYear(localDate.getUTCFullYear() - yearsAgo));
};
