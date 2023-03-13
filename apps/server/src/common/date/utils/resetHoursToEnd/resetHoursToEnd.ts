import { DateType } from '../index';

export const resetHoursToEnd = (date: DateType) => new Date(new Date(date).setHours(23, 59, 0, 0));
