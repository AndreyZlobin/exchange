import { wordDeclension } from '../wordDeclension';
export const DAYS_NAMING = [' день', ' дня', ' дней'];
export const timeToDays = (time: string) => {
  const daysCount = time.split('.')[0];

  return daysCount + wordDeclension(+daysCount, DAYS_NAMING);
};
