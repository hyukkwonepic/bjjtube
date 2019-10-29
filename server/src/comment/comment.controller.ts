import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CommentsResponseDto,
  CreateCommentDto,
  CommentResponseDto,
} from './comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  findAll(@Param('videoId') videoId): Promise<CommentsResponseDto> {
    return this.commentService.findAllByVideo(videoId);
  }

  @Post('/')
  create(
    @Param('videoId') videoId,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    return this.commentService.createByVideo(videoId, createCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<CommentResponseDto> {
    return this.commentService.delete(id);
  }
}
