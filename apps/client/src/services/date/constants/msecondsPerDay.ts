import { HOURS_PER_DAY } from './hoursPerDay';
import { MINUTES_PER_HOUR } from './minutesPerHour';
import { MSECONDS_PER_SECOND } from './msecondsPerSecond';
import { SECONDS_PER_MINUTE } from './secondsPerMinute';

export const MSECONDS_PER_DAY =
  MSECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;
