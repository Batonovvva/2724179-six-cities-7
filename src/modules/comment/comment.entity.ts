import {getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {OfferEntity} from '../offer/offer.entity.js';
import {UserEntity} from '../user/user.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true
  }
})
export class CommentEntity {
  public readonly id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  @prop({required: true, trim: true})
  public text!: string;

  @prop({required: true, default: Date.now})
  public postDate!: Date;

  @prop({required: true})
  public rating!: number;

  @prop({required: true, ref: () => UserEntity})
  public author!: Ref<UserEntity>;

  @prop({required: true, ref: () => OfferEntity})
  public offer!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
