import { DateType } from '../types';

export const subDays = (date: DateType, daysAgo: number) => {
  const localDate = new Date(date);

  return new Date(localDate.setUTCDate(localDate.getUTCDate() - daysAgo));
};
