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

  async findAllByVideo(videoId: string): Promise<CommentsResponseDto> {
    const [comments, count] = await this.commentRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where: {
        video: {
          id: videoId,
        },
      },
    });
    return {
      comments,
      count,
    };
  }

  async createByVideo(
    videoId: string,
    comment: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const video = new Video();
    video.id = videoId;

    let newComment = new Comment();
    newComment = {
      ...newComment,
      ...comment,
      video,
    };

    const { id, content } = await this.commentRepository.save(newComment);
    return {
      comment: {
        id,
        content,
      },
    };
  }

  async delete(id: string): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findOne(id);
    await this.commentRepository.delete(id);
    return { comment };
  }
}
