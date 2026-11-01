import {DocumentType, ReturnModelType} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {isValidObjectId, Types} from 'mongoose';
import {Component} from '../../shared/container/component.js';
import {CreateOfferDto} from './create-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel)
    private readonly offerModel: ReturnModelType<typeof OfferEntity>
  ) {}

  public async create(data: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const {authorId, ...offerData} = data;

    return this.offerModel.create({
      ...offerData,
      author: new Types.ObjectId(authorId)
    });
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    if (!isValidObjectId(offerId)) {
      return null;
    }

    return this.offerModel.findById(offerId).exec();
  }
}
