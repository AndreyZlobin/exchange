import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { object, Schema, ValidationError } from "yup";

function normalizeYupErrors(errors: ValidationError): Record<string, string> {
  const validationErrors: Record<string, string> = {};

  if (errors.inner.length === 0) {
    validationErrors[errors.path] = errors.message;
    return validationErrors;
  }

  errors.inner.forEach((err) => {
    if (err.inner.length === 0) {
      validationErrors[err.path] = err.message;
      return;
    }

    err.inner.forEach((e) => {
      validationErrors[e.path] = e.message;
    });
  });

  return validationErrors;
}

export const createValidateSchema = ({
  body,
  query,
  params,
}: {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}) => {
  return object({ body, query, params });
};

export function ValidateInput(schema: Schema): MethodDecorator & ClassDecorator {
  class ValidationInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const [req] = context.getArgs();
      const { body, query, params } = req;

      try {
        await schema.validate({ body, query, params }, { abortEarly: false });
        return next.handle();
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new HttpException(
            { errors: normalizeYupErrors(error), statusCode: HttpStatus.BAD_REQUEST },
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  return UseInterceptors(new ValidationInterceptor());
}
