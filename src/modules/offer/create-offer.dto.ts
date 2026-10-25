import {City} from '../../types/city.type.js';
import {Location} from '../../types/location.type.js';
import {Facility, HousingType} from '../../types/offer.type.js';

export type CreateOfferDto = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  guests: number;
  price: number;
  facilities: Facility[];
  authorId: string;
  commentsCount: number;
  location: Location;
};
