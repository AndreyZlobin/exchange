import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiError } from '@shared/exceptions/api.error';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('/health-check')
  @ApiOkResponse({ type: Boolean })
  @ApiError.internalServerError()
  async heathCheck() {
    return true;
  }
}
