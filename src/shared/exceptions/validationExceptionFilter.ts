import { ILogger } from "@common/logger";
import { TYPES } from "@DI/types";
import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { inject } from "inversify";
import { ValidationError } from "yup";

@Catch(ValidationError)
export class ValidationExceptionFilter {
  constructor(@inject(TYPES.services.LoggerService) private readonly logger: ILogger) {}
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errors = exception.errors.map((error: string) => {
      this.logger.error(error);
      return { message: error };
    });

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Input validation failed",
      errors,
    });
  }
}
