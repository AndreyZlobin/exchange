import { Body, Controller, Post } from "@nestjs/common";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../DI/types";
import { ValidateInput } from "../../shared/validators";
import { RegisterUserDto, UserLoginDto } from "./dto";
// import { IAuthService } from "./services";
import { registerSchema } from "./validations";

@injectable()
@Controller("auth")
export class AuthController {
  constructor(@inject(TYPES.auth.AuthService) private readonly authService: any) {}
  @Post("/register")
  @ValidateInput(registerSchema)
  async registerUser(@Body() userDto: RegisterUserDto) {
    // return this.created(res, );
    return await this.authService.register(userDto);
  }

  @Post("/login")
  async login(@Body() userLoginDto: UserLoginDto): Promise<void> {
    return await this.authService.login(userLoginDto);
  }

  @Post("/reset_password")
  async resetPassword(@Body() userDto: RegisterUserDto) {
    return await this.authService.register(userDto);
  }

  @Post("/logout")
  async logout() {
    return true;
  }
  @Post("/refresh")
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return await this.authService.refresh(refreshToken);
  }
}
