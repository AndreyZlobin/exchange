import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Health")
@Controller()
export class AppController {
  @Get("/health-check")
  @ApiOperation({ summary: "Проверка работоспособности сервера" })
  async heathCheck() {
    return true;
  }
}
