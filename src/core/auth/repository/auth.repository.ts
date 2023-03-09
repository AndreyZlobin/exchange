import { TYPES } from "@DI/types";
import { Inject, Injectable } from "@nestjs/common";
import { IPrismaService } from "@src/database";

export interface IAuthRepository {
  check(): Promise<void>;
}

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@Inject(TYPES.DB.PrismaService) private readonly prismaService: IPrismaService) {}

  check(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
