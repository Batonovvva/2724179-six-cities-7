import {DocumentType} from '@typegoose/typegoose';
import {CreateOfferDto} from './create-offer.dto.js';
import {OfferEntity} from './offer.entity.js';

export interface OfferService {
  create(data: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
