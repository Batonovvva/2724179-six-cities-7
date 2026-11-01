import {DocumentType} from '@typegoose/typegoose';
import {CreateCommentDto} from './create-comment.dto.js';
import {CommentEntity} from './comment.entity.js';

export interface CommentService {
  create(data: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
