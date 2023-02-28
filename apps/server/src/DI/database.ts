import {
  IMongoService,
  IPrismaService,
  IRedisService,
  MongoService,
  PrismaService,
  RedisService,
} from "../infra";
import { container } from "./container";
import { TYPES } from "./types";

/*DataBase*/
container.bind<IRedisService>(TYPES.DB.RedisService).to(RedisService);
container.bind<IMongoService>(TYPES.DB.MongoService).to(MongoService);
container.bind<IPrismaService>(TYPES.DB.PrismaService).to(PrismaService);
export const redisService = container.get<IRedisService>(TYPES.DB.RedisService);
export const mongoService = container.get<IMongoService>(TYPES.DB.MongoService);
export const prismaService = container.get<IPrismaService>(TYPES.DB.PrismaService);

export const DBCollection = Object.freeze({
  mongoService,
  prismaService,
  redisService,
});
