import {
  ConfigService,
  ConfigServiceWithEnv,
  DateService,
  IDateService,
  ILogger,
  LoggerService,
} from "../infra";
import {
  BcryptService,
  BotService,
  CronService,
  IBcryptService,
  IBotService,
  ICronService,
  IJWTService,
  JWTService,
} from "../services";
import { container } from "./container";
import { TYPES } from "./types";

/*Shared*/
container.bind<ConfigServiceWithEnv>(TYPES.services.ConfigService).to(ConfigService);
container.bind<ILogger>(TYPES.services.LoggerService).to(LoggerService);
container.bind<IDateService>(TYPES.services.DateService).to(DateService);
container.bind<ICronService>(TYPES.services.CronService).to(CronService);
container.bind<IBcryptService>(TYPES.services.BcryptService).to(BcryptService);
container.bind<IJWTService>(TYPES.services.JWTService).to(JWTService);
container.bind<IBotService>(TYPES.services.BotService).to(BotService).inSingletonScope();

export const configService = container.get<ConfigServiceWithEnv>(TYPES.services.ConfigService);
export const loggerService = container.get<ILogger>(TYPES.services.LoggerService);
export const botService = container.get<IBotService>(TYPES.services.BotService);
