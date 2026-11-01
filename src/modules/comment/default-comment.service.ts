import {DocumentType, ReturnModelType} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {isValidObjectId, Types} from 'mongoose';
import {Component} from '../../shared/container/component.js';
import {OfferEntity} from '../offer/offer.entity.js';
import {CreateCommentDto} from './create-comment.dto.js';
import {CommentEntity} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';

type OfferStatistics = {
  commentsCount: number;
  rating: number;
};

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: ReturnModelType<typeof CommentEntity>,
    @inject(Component.OfferModel)
    private readonly offerModel: ReturnModelType<typeof OfferEntity>
  ) {}

  public async create(data: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create({
      text: data.text,
      rating: data.rating,
      author: new Types.ObjectId(data.userId),
      offer: new Types.ObjectId(data.offerId)
    });

    await this.updateOfferStatistics(data.offerId);
    return comment;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    if (!isValidObjectId(offerId)) {
      return [];
    }

    return this.commentModel
      .find({offer: offerId})
      .sort({postDate: -1})
      .limit(50)
      .populate('author')
      .exec();
  }

  private async updateOfferStatistics(offerId: string): Promise<void> {
    const [statistics] = await this.commentModel.aggregate<OfferStatistics>([
      {$match: {offer: new Types.ObjectId(offerId)}},
      {$group: {_id: '$offer', commentsCount: {$sum: 1}, rating: {$avg: '$rating'}}}
    ]).exec();

    if (!statistics) {
      return;
    }

    await this.offerModel.findByIdAndUpdate(offerId, {
      commentsCount: statistics.commentsCount,
      rating: Math.round(statistics.rating * 10) / 10
    }).exec();
  }
}
