import {DocumentType, ReturnModelType} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {isValidObjectId} from 'mongoose';
import {Component} from '../../shared/container/component.js';
import {User} from '../../types/user.type.js';
import {UserEntity} from './user.entity.js';
import {UserService} from './user-service.interface.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.UserModel)
    private readonly userModel: ReturnModelType<typeof UserEntity>
  ) {}

  public async create(data: User): Promise<DocumentType<UserEntity>> {
    return this.userModel.create(data);
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    if (!isValidObjectId(userId)) {
      return null;
    }

    return this.userModel.findById(userId).exec();
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email: email.toLowerCase()}).exec();
  }
}
