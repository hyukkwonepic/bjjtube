import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
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
    @Param('videoId') videoId,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const { id, content } = await this.commentService.create(
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
  async delete(@Param('id') id): Promise<CommentResponseDto> {
    const comment = await this.commentService.delete(id);
    return { comment };
  }
}
