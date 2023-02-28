import { Controller, Post } from "@nestjs/common";
import { injectable } from "inversify";
import { object, string } from "yup";

import { createValidateSchema, ValidateInput } from "../../shared/validators";

const t = createValidateSchema({
  body: object({
    email: string().email().required("Email is required field"),
    // password: string()
    //   .min(6, { min: "Password must be greater 6 symbols" })
    //   .max(24, { max: "Password must be less 24 symbols" })
    //   .required(),
  }),
  query: object({
    test: string().max(1),
  }),
});

@injectable()
@Controller("user")
export class UserController {
  @Post("/profile")
  @ValidateInput(t)
  async getUserProfile() {
    return true;
  }
}
