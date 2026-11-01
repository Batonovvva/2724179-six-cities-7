import {DocumentType} from '@typegoose/typegoose';
import {CreateOfferDto} from './create-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
import {UpdateOfferDto} from './update-offer.dto.js';

export interface OfferService {
  create(data: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, data: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  updateFavoriteStatus(offerId: string, isFavorite: boolean): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
