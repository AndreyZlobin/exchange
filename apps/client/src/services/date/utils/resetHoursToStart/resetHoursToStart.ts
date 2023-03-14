import { DateType } from '../index';

export const resetHoursToStart = (date: DateType) => new Date(new Date(date).setHours(0, 0, 0, 0));
