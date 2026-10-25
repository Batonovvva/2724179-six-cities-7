import {DocumentType} from '@typegoose/typegoose';
import {User} from '../../types/user.type.js';
import {UserEntity} from './user.entity.js';

export interface UserService {
  create(data: User): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
}
