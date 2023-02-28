import { config, DotenvParseOutput } from "dotenv";
import { injectable } from "inversify";
export interface IConfigService<Env extends string> {
  get(key: Env): string;
}

@injectable()
export class ConfigService<Env extends string> implements IConfigService<Env> {
  private readonly config: DotenvParseOutput;
  constructor() {
    const { error, parsed } = config();

    if (error) {
      throw new Error("Error of config parse");
    }
    if (!parsed) {
      throw new Error("Config is empty");
    }
    this.config = parsed;
  }

  get(key: Env): string {
    return this.config[key];
  }
}

export type Env =
  | "PORT"
  | "API_VERSION"
  | "NODE_ENV"
  | "DATABASE_URL"
  | "ACCESS_TOKEN_SECRET"
  | "REFRESH_TOKEN_SECRET"
  | "ACCESS_TOKEN_EXP"
  | "REFRESH_TOKEN_EXP"
  | "REDIS_HOST"
  | "REDIS_PORT"
  | "REDIS_EXTERNAL_PORT"
  | "REDIS_PASSWORD"
  | "TELEGRAM_BOT_TOKEN"
  | "REDIS_CONNECTION";

export type ConfigServiceWithEnv = IConfigService<Env>;
