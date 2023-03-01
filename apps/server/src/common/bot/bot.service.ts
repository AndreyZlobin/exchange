import { TYPES } from "@DI/types";
import { ConfigServiceWithEnv } from "@src/common/configs";
import { ILogger } from "@src/common/logger";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

export interface IBotService {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}

@injectable()
export class BotService implements IBotService {
  private bot: Telegraf;
  constructor(
    @inject(TYPES.services.ConfigService) private readonly config: ConfigServiceWithEnv,
    @inject(TYPES.services.LoggerService) private readonly logger: ILogger,
  ) {
    this.bot = new Telegraf(this.config.get("TELEGRAM_BOT_TOKEN"));
  }

  public async $connect(): Promise<void> {
    try {
      await this.bot.launch();

      this.logger.log("[Telegram bot]: Telegram bot has been started");
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(e);
    }
  }

  public async $disconnect(): Promise<void> {
    await this.bot.stop();
  }
}
