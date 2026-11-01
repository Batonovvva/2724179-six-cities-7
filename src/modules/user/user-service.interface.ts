import {DocumentType} from '@typegoose/typegoose';
import {CreateUserDto} from './create-user.dto.js';
import {UserEntity} from './user.entity.js';

export interface UserService {
  create(data: CreateUserDto): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
}
