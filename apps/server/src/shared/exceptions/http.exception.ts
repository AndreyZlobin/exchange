import { LoggerService } from "@common/logger";
import { HttpException as NestHttpException, HttpStatus } from "@nestjs/common";

function getCurrentFilename() {
  const err = new Error();

  const callerfile = err.stack.split("\n")[3].split(":")[0].trim();

  return callerfile;
}
export class HttpException extends NestHttpException {
  private readonly logger = new LoggerService();
  constructor(message: string, status: HttpStatus, context = getCurrentFilename()) {
    super(message, status);
    this.logError(context);
  }
  public logError(context: string): void {
    this.logger.error(`[${context}]: [${this.getStatus()}] - ${this.message}`);
  }
}
