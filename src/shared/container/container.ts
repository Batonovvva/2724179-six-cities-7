import {Container} from 'inversify';
import {Application} from '../../application.js';
import {DefaultOfferService} from '../../modules/offer/default-offer.service.js';
import {OfferEntity, OfferModel} from '../../modules/offer/offer.entity.js';
import {OfferService} from '../../modules/offer/offer-service.interface.js';
import {DefaultUserService} from '../../modules/user/default-user.service.js';
import {UserEntity, UserModel} from '../../modules/user/user.entity.js';
import {UserService} from '../../modules/user/user-service.interface.js';
import {ReturnModelType} from '@typegoose/typegoose';
import {Config} from '../config/config.interface.js';
import {RestConfig} from '../config/rest-config.js';
import {DatabaseClient} from '../database-client/database-client.interface.js';
import {MongoDatabaseClient} from '../database-client/mongo.database-client.js';
import {Logger} from '../logger/logger.interface.js';
import {PinoLogger} from '../logger/pino-logger.js';
import {Component} from './component.js';

export const container = new Container();

container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
container.bind<Config>(Component.Config).to(RestConfig).inSingletonScope();
container.bind<Application>(Component.Application).to(Application).inSingletonScope();
container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
container.bind<ReturnModelType<typeof UserEntity>>(Component.UserModel).toConstantValue(UserModel);
container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
container.bind<ReturnModelType<typeof OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
