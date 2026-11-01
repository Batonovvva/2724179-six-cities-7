import {getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {Facility, HousingType} from '../../types/offer.type.js';
import {UserEntity} from '../user/user.entity.js';

class LocationEntity {
  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;
}

class CityEntity {
  @prop({required: true})
  public name!: string;

  @prop({required: true, type: () => LocationEntity, _id: false})
  public location!: LocationEntity;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})
export class OfferEntity {
  public readonly id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  @prop({required: true, trim: true})
  public title!: string;

  @prop({required: true, trim: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({required: true, type: () => CityEntity, _id: false})
  public city!: CityEntity;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true, type: () => [String]})
  public images!: string[];

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true, default: false})
  public isFavorite!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({required: true, enum: HousingType, type: String})
  public type!: HousingType;

  @prop({required: true})
  public rooms!: number;

  @prop({required: true})
  public guests!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true, enum: Facility, type: () => [String]})
  public facilities!: Facility[];

  @prop({required: true, ref: () => UserEntity})
  public author!: Ref<UserEntity>;

  @prop({required: true, default: 0})
  public commentsCount!: number;

  @prop({required: true, type: () => LocationEntity, _id: false})
  public location!: LocationEntity;
}

export const OfferModel = getModelForClass(OfferEntity);
