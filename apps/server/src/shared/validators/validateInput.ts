import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AnyObjectSchema,
  AnySchema,
  array,
  ArraySchema,
  boolean,
  BooleanSchema,
  date,
  number,
  NumberSchema,
  object,
  Schema,
  string,
  StringSchema,
  ValidationError,
} from 'yup';

export type ConditionalSchema<T> = T extends string
  ? StringSchema
  : T extends number
  ? NumberSchema
  : T extends boolean
  ? BooleanSchema
  : T extends Record<any, any>
  ? AnyObjectSchema
  : T extends Array<any>
  ? ArraySchema<any, any>
  : AnySchema;

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

export class Validator {
  static createSchema<Body = unknown, Query = unknown, Params = unknown>({
    body,
    query,
    params,
  }: {
    body?: Shape<Body>;
    query?: Shape<Query>;
    params?: Shape<Params>;
  }) {
    return object({
      body: object(body || {}),
      query: object(query || {}),
      params: object(params || {}),
    });
  }

  static get string() {
    return string;
  }
  static get number() {
    return number;
  }
  static get boolean() {
    return boolean;
  }
  static get array() {
    return array;
  }
  static get object() {
    return object;
  }
  static get date() {
    return date;
  }
}

export function ValidateInput(schema: Schema): MethodDecorator & ClassDecorator {
  class ValidationInterceptor implements NestInterceptor {
    private normalizeErrors(errors: ValidationError): Record<string, string> {
      const validationErrors: Record<string, string> = {};

      if (errors.inner.length === 0) {
        validationErrors[errors.path] = errors.message;
        return validationErrors;
      }

      errors.inner.forEach((err) => {
        if (err.inner.length === 0) {
          const path = err.path.split('.')?.at(1) || err.path;
          const message = err.message.split('.')?.at(1) || err.message;

          validationErrors[path] = message;
          return;
        }

        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
      });
      return validationErrors;
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const [req] = context.getArgs();
      const { body, query, params } = req;

      try {
        await schema.validate({ body: body, query, params }, { abortEarly: false });
        return next.handle();
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new HttpException(
            { errors: this.normalizeErrors(error), statusCode: HttpStatus.BAD_REQUEST },
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  return UseInterceptors(new ValidationInterceptor());
}
