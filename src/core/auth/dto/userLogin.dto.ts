import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({ required: true, type: String })
  name!: string;
  @ApiProperty({ required: true, type: String })
  password!: string;
}
