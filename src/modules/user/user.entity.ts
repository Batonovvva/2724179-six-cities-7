import {getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {UserType} from '../../types/user.type.js';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})
export class UserEntity {
  public readonly id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  @prop({required: true, trim: true})
  public name!: string;

  @prop({required: true, trim: true, lowercase: true, unique: true})
  public email!: string;

  @prop()
  public avatarPath?: string;

  @prop({required: true})
  public password!: string;

  @prop({required: true, enum: UserType, type: String})
  public type!: UserType;
}

export const UserModel = getModelForClass(UserEntity);
