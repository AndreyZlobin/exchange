import { CronJob } from "cron";
import { injectable } from "inversify";

export interface ICronService {
  start(): void;
  stop(): void;
  addJob(name: string, job: CronJob): void;
  removeJob(name: string): void;
}

@injectable()
export class CronService implements ICronService {
  private jobs: Record<string, CronJob> = {};

  start(): void {
    Object.values(this.jobs).forEach((job) => job.start());
  }

  stop(): void {
    Object.values(this.jobs).forEach((job) => job.stop());
  }

  addJob(name: string, job: CronJob): void {
    // job.n
    this.jobs[name] = job;
  }

  removeJob(name: string): void {
    const job = this.jobs[name];

    if (job) {
      job.stop();
      delete this.jobs[name];
    }
  }
}
