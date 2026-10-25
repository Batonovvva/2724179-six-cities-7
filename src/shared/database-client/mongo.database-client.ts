import {inject, injectable} from 'inversify';
import mongoose from 'mongoose';
import {Component} from '../container/component.js';
import {Logger} from '../logger/logger.interface.js';
import {DatabaseClient} from './database-client.interface.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info(`Попытка подключения к MongoDB: ${this.hideCredentials(uri)}`);
    await mongoose.connect(uri);
    this.logger.info('Соединение с MongoDB установлено');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Соединение с MongoDB закрыто');
  }

  private hideCredentials(uri: string): string {
    return uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@');
  }
}
