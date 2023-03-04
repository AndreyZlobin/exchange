import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout } from "@nestjs/schedule";

@Injectable()
export class ScheduleService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    return Promise.resolve(1);
  }

  @Interval(10000)
  handleInterval() {
    return Promise.resolve(1);
  }

  @Timeout(5000)
  handleTimeout() {
    return Promise.resolve(1);
  }
}
