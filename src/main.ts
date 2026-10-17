import 'reflect-metadata';
import {Application} from './application.js';
import {Component} from './shared/container/component.js';
import {container} from './shared/container/container.js';
import {Logger} from './shared/logger/logger.interface.js';

const logger = container.get<Logger>(Component.Logger);
const application = container.get<Application>(Component.Application);

try {
  application.init();
} catch (error: unknown) {
  logger.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
