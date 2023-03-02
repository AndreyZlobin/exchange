import { TYPES } from "@DI/types";
import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ValidateInput } from "@shared/validators";
import { IAuthService } from "@src/core/auth/services";

import { CreateUserDto, UserLoginDto } from "./dto";
import { registerSchema } from "./validations";

@ApiTags("Auth")
@Injectable()
@Controller("auth")
export class AuthController {
  constructor(@Inject(TYPES.auth.AuthService) private readonly authService: IAuthService) {}
  @Post("/register")
  @ValidateInput(registerSchema)
  async registerUser(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post("/login")
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.login(userLoginDto);
  }

  @Post("/reset_password")
  async resetPassword(@Body() userDto: CreateUserDto) {
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
