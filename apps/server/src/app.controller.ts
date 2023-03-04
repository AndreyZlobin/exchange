import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "@src/core/roles";

@ApiTags("Health")
@Controller()
export class AppController {
  @Get("/health-check")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Проверка работоспособности сервера" })
  async heathCheck() {
    return true;
  }
}
