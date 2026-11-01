import {Schema} from 'convict';
import {AppConfig} from './config.interface.js';

export const configSchema: Schema<AppConfig> = {
  PORT: {
    doc: 'Порт приложения',
    format: 'port',
    default: null,
    env: 'PORT'
  },
  DB_HOST: {
    doc: 'IP-адрес сервера базы данных',
    format: 'ipaddress',
    default: null,
    env: 'DB_HOST'
  },
  SALT: {
    doc: 'Соль для паролей',
    format: (value: unknown) => {
      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error('Укажите непустую строку');
      }
    },
    default: null,
    env: 'SALT',
    sensitive: true
  }
};
