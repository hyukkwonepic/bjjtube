import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(videoId: string): Promise<[Comment[], number]> {
    return await this.commentRepository
      .createQueryBuilder()
      .leftJoin('Comment.user', 'User')
      .orderBy('Comment.createdAt', 'DESC')
      .select(['Comment', 'User.id', 'User.username'])
      .where('Comment.videoId = :videoId', { videoId })
      .getManyAndCount();
  }

  async create(
    userId: string,
    videoId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { identifiers } = await this.commentRepository
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values({
        ...createCommentDto,
        user: {
          id: userId,
        },
        video: {
          id: videoId,
        },
      })
      .execute();

    const [{ id }] = identifiers;

    return await this.commentRepository
      .createQueryBuilder()
      .where('Comment.id = :id', { id })
      .getOne();
  }

  async delete(userId: string, commentId: string): Promise<Comment> {
    const comment = await this.commentRepository
      .createQueryBuilder()
      .leftJoin('Comment.user', 'User')
      .select(['Comment', 'User.id'])
      .where('Comment.id = :commentId', { commentId })
      .getOne();

    if (comment.user.id !== userId) {
      throw new UnauthorizedException();
    }

    await this.commentRepository
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('Comment.id = :commentId', { commentId })
      .execute();

    return comment;
  }
}
