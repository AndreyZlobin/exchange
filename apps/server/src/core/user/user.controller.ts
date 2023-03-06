import { TYPES } from "@DI/types";
import { Controller, Inject, Injectable, Post } from "@nestjs/common";
import { ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { createValidateSchema, ValidateInput } from "@shared/validators";
import { IUserService } from "@src/core/user/service";
import { object, string } from "yup";

const t = createValidateSchema({
  body: object({
    email: string().email().required("Email is required field"),
    password: string()
      .min(6, { min: "Password must be greater 6 symbols" })
      .max(24, { max: "Password must be less 24 symbols" })
      .required(),
  }),
  query: object({
    test: string().max(1),
  }),
});

@ApiTags("User")
@Injectable()
@Controller("user")
export class UserController {
  constructor(@Inject(TYPES.user.UserService) private readonly userService: IUserService) {}
  @Post("/profile")
  @ValidateInput(t)
  async getUserProfile() {
    return this.userService.getUserProfile();
  }

  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath("User") },
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post("/")
  async getAll() {
    return this.userService.getAll();
  }
}
