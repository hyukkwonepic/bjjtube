import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CommentsResponseDto,
  CreateCommentDto,
  CommentResponseDto,
} from './comment.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  async findAll(@Param('videoId') videoId): Promise<CommentsResponseDto> {
    const [comments, count] = await this.commentService.findAll(videoId);
    return {
      comments,
      count,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(
    @Req() req,
    @Param('videoId') videoId,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const { id: userId } = req.user;
    const { id, content } = await this.commentService.create(
      userId,
      videoId,
      createCommentDto,
    );
    return {
      comment: {
        id,
        content,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Req() req,
    @Param('id') commentId,
  ): Promise<CommentResponseDto> {
    const { id: userId } = req.user;
    const comment = await this.commentService.delete(userId, commentId);
    return { comment };
  }
}
