import { ConfigServiceWithEnv } from '@common/configs';
import { ILogger } from '@common/logger';
import { TYPES } from '@DI/types';
import { inject, injectable } from 'inversify';
import { Mongoose } from 'mongoose';

import { IDataBaseService } from '../types';

export type IMongoService = IDataBaseService;
// createModel<T extends object>(name: string, schema: Schema<T>): Model<T, object, object>;

@injectable()
export class MongoService implements IMongoService {
  private database: Mongoose = new Mongoose();

  constructor(
    @inject(TYPES.services.ConfigService) private readonly config: ConfigServiceWithEnv,
    @inject(TYPES.services.LoggerService) private readonly logger: ILogger,
  ) {
    this.database.connection.on('error', (error) => {
      this.logger.error(error);
    });
  }

  // public createModel<T extends object>(name: string, schema: Schema<T>) {
  //   return this.database.model(name, schema);
  // }

  async $connect() {
    const connectUrl = this.config.get('DATABASE_URL');

    try {
      await this.database.connect(connectUrl, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        // useUnifiedTopology: true,
      });

      // const filenames: string[] = await readDir(pathToModels);
      //
      // const modelsPaths = filenames
      //   .map((fileName) => path.resolve(pathToModels, fileName))
      //   .filter((el) => !el.endsWith(".js"));
      //
      // // console.log(modelsPaths);
      //
      // const all = await Promise.all(modelsPaths.map((el) => import(el)));
      //
      // console.log(all);
      //

      this.logger.log('[DATABASE]: connected successfully');
    } catch (e) {
      this.logger.error('[DATABASE]: error', e);
      process.exit(1);
    }
  }

  async $disconnect() {
    try {
      await this.database.disconnect();
    } catch (e) {
      this.logger.error(e);
      process.exit(1);
    }
  }
}
