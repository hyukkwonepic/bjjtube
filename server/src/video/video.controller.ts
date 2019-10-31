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
} from '@nestjs/common';
import { VideoService } from './video.service';
import {
  CreateVideoDto,
  FindAllQueryDto,
  VideosResponseDto,
  VideoResponseDto,
} from './video.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/')
  findAll(@Query() query: FindAllQueryDto): Promise<VideosResponseDto> {
    return this.videoService.findAll(query);
  }

  @Get(':videoId')
  findOne(@Param('videoId') id): Promise<VideoResponseDto> {
    return this.videoService.findOne(id);
  }

  @Post('/')
  create(@Body() createVideoDto: CreateVideoDto): Promise<VideoResponseDto> {
    return this.videoService.create(createVideoDto);
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
