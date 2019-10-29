import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { VideoService } from './video.service';
import {
  CreateVideoDto,
  FindAllQueryDto,
  VideosResponseDto,
  VideoResponseDto,
} from './video.dto';

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

  @Delete(':id')
  delete(@Param('id') id): Promise<VideoResponseDto> {
    return this.videoService.delete(id);
  }
}
