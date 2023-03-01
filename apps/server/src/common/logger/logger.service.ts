import { Injectable } from "@nestjs/common";
import { injectable } from "inversify";
// import { injectable } from "inversify";
import { ILogObj, Logger } from "tslog";
export interface ILogger {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}

@injectable()
export class LoggerService implements ILogger {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger();
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}

@Injectable()
export class LoggerService2 implements ILogger {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger();
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
