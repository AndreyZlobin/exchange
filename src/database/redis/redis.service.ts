import { ILogger } from '@common/logger';
import { TYPES } from '@DI/types';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigServiceWithEnv } from '@src/common/configs';
import { createClient, RedisClientType } from 'redis';

import { IDataBaseService } from '../types';

export interface IRedisService extends IDataBaseService {
  client: RedisClientType;
}

@Injectable()
export class RedisService implements IRedisService {
  readonly client: RedisClientType;
  constructor(
    @Inject(TYPES.services.LoggerService) private readonly logger: ILogger,
    @Inject(TYPES.services.ConfigService) private readonly config: ConfigServiceWithEnv,
  ) {
    this.client = createClient({
      url: this.config.get('REDIS_CONNECTION'),
      password: this.config.get('REDIS_PASSWORD'),
    });
    this.handlers();
  }

  private handlers() {
    this.client.on('error', (err) => this.logger.error('[Redis]: Redis Client Error', err));
    this.client.on('connect', () => this.logger.log('[Redis]: Redis plugged in.'));
    this.client.on('reconnecting', () => this.logger.log('[Redis]: Redis reconnecting'));
    this.client.on('ready', () => this.logger.log('[Redis]: Redis ready!'));
  }

  async $connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (e) {
      this.logger.error(e);
      process.exit(1);
    }
  }
  async $disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
