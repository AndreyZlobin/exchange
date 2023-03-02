import { Controller, Get, UseGuards } from "@nestjs/common";
import { RolesGuard } from "@src/core/roles";

@Controller()
export class AppController {
  @Get("/health-check")
  @UseGuards(RolesGuard)
  async heathCheck() {
    return true;
  }
}
