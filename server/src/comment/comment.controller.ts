import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentsResponseDto, CreateCommentDto } from './comment.dto';

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
  ) {
    return this.commentService.createByVideo(videoId, createCommentDto);
  }
}
