import {MockOffer} from '../types/mock-offer.type.js';
import {Offer} from '../types/offer.type.js';
import {getRandomInteger, getRandomItem} from './random.js';

export function generateOffer(templates: MockOffer[]): Offer {
  const template = getRandomItem(templates);

  return {
    ...template,
    postDate: new Date(Date.now() - getRandomInteger(0, 7) * 24 * 60 * 60 * 1000),
    isPremium: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    rating: getRandomInteger(10, 50) / 10,
    rooms: getRandomInteger(1, 8),
    guests: getRandomInteger(1, 10),
    price: getRandomInteger(100, 100000),
    commentsCount: 0
  };
}
