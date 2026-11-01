import {DocumentType, ReturnModelType} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {isValidObjectId, Types} from 'mongoose';
import {Component} from '../../shared/container/component.js';
import {CommentEntity} from '../comment/comment.entity.js';
import {CreateOfferDto} from './create-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';
import {UpdateOfferDto} from './update-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel)
    private readonly offerModel: ReturnModelType<typeof OfferEntity>,
    @inject(Component.CommentModel)
    private readonly commentModel: ReturnModelType<typeof CommentEntity>
  ) {}

  public async create(data: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const {authorId, ...offerData} = data;

    return this.offerModel.create({
      ...offerData,
      author: new Types.ObjectId(authorId)
    });
  }

  public async find(limit = 60): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find()
      .sort({postDate: -1})
      .limit(limit)
      .populate('author')
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    if (!isValidObjectId(offerId)) {
      return null;
    }

    return this.offerModel.findById(offerId).populate('author').exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({'city.name': city, isPremium: true})
      .sort({postDate: -1})
      .limit(3)
      .populate('author')
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isFavorite: true})
      .sort({postDate: -1})
      .populate('author')
      .exec();
  }

  public async updateById(offerId: string, data: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    if (!isValidObjectId(offerId)) {
      return null;
    }

    return this.offerModel.findByIdAndUpdate(offerId, data, {new: true}).populate('author').exec();
  }

  public async updateFavoriteStatus(offerId: string, isFavorite: boolean): Promise<DocumentType<OfferEntity> | null> {
    if (!isValidObjectId(offerId)) {
      return null;
    }

    return this.offerModel.findByIdAndUpdate(offerId, {isFavorite}, {new: true}).populate('author').exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    if (!isValidObjectId(offerId)) {
      return null;
    }

    const offer = await this.offerModel.findByIdAndDelete(offerId).exec();

    if (offer) {
      await this.commentModel.deleteMany({offer: offerId}).exec();
    }

    return offer;
  }
}
