import convict from 'convict';
import formats from 'convict-format-with-validator';
import {config} from 'dotenv';
import {injectable} from 'inversify';
import {AppConfig, Config} from './config.interface.js';
import {configSchema} from './config.schema.js';

convict.addFormats(formats);

@injectable()
export class RestConfig implements Config {
  private configuration?: convict.Config<AppConfig>;

  public init(): void {
    config();
    this.configuration = convict(configSchema);
    this.configuration.validate({allowed: 'strict'});
  }

  public get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    if (!this.configuration) {
      throw new Error('Настройки ещё не загружены');
    }

    return this.configuration.get(key) as AppConfig[T];
  }
}
