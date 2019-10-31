import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import {
  CreateCommentDto,
  CommentsResponseDto,
  CommentResponseDto,
} from './comment.dto';
import { Video } from '../video/video.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(videoId: string): Promise<[Comment[], number]> {
    return await this.commentRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where: {
        video: {
          id: videoId,
        },
      },
    });
  }

  async create(videoId: string, comment: CreateCommentDto): Promise<Comment> {
    const video = new Video();
    video.id = videoId;

    let newComment = new Comment();
    newComment = {
      ...newComment,
      ...comment,
      video,
    };

    return await this.commentRepository.save(newComment);
  }

  async delete(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    await this.commentRepository.delete(id);
    return comment;
  }
}
