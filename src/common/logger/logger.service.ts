import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { ILogObj, Logger } from "tslog";
export interface ILogger {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}
@Injectable()
export class LoggerService implements ILogger, NestLoggerService {
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

  debug(message: unknown[]): void {
    this.logger.debug(message);
  }

  verbose(message: unknown[]): void {
    this.logger.warn(message);
  }
}
