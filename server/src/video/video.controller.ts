import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { VideoService } from './video.service';
import {
  CreateVideoDto,
  UpdateVideoDto,
  VideosResponseDto,
  VideoResponseDto,
} from './video.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/')
  async findAll(@Query('page') page?: number): Promise<VideosResponseDto> {
    const [videos, count] = await this.videoService.findAll(page);
    return {
      videos,
      count,
    };
  }

  @Get(':videoId')
  async findOne(@Param('videoId') videoId): Promise<VideoResponseDto> {
    const video = await this.videoService.findOne(videoId);
    return { video };
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(
    @Req() req,
    @Body() createVideoDto: CreateVideoDto,
  ): Promise<VideoResponseDto> {
    const { id: userId } = req.user;
    const video = await this.videoService.create(userId, createVideoDto);
    return { video };
  }

  @UseGuards(AuthGuard)
  @Put(':videoId')
  async update(
    @Req() req,
    @Param('videoId') videoId,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<VideoResponseDto> {
    const { id: userId } = req.user;
    const video = await this.videoService.update(
      userId,
      videoId,
      updateVideoDto,
    );
    return { video };
  }

  @UseGuards(AuthGuard)
  @Delete(':videoId')
  async delete(
    @Req() req,
    @Param('videoId') videoId,
  ): Promise<VideoResponseDto> {
    const { id: userId } = req.user;
    const video = await this.videoService.delete(videoId, userId);
    return { video };
  }
}
