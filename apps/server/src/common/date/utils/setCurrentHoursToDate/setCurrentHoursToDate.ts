import { DateType } from '../index';

export const setCurrentHoursToDate = (date: DateType) => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliseconds = currentDate.getMilliseconds();

  const formattedDate = new Date(date).setHours(hours, minutes, seconds, milliseconds);

  return new Date(formattedDate);
};
