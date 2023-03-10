import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ErrorResponseDto } from './errorResponse.dto';

export class ApiError {
  static readonly errorResponseDTO: ErrorResponseDto;

  static forbidden() {
    return ApiForbiddenResponse({ description: 'Forbidden', type: ErrorResponseDto });
  }
  static unauthorized() {
    return ApiUnauthorizedResponse({ description: 'unauthorized', type: ErrorResponseDto });
  }
  static badRequest() {
    return ApiBadRequestResponse({ description: 'Bad request', type: ErrorResponseDto });
  }
  static internalServerError() {
    return ApiInternalServerErrorResponse({
      description: 'internal server error response',
      type: ErrorResponseDto,
    });
  }
}
