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
import { Video } from './video.entity';
import { CreateVideoDto, FindAllQueryDto } from './video.dto';
import { VideosResponse, VideoResponse } from './video.interface';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/')
  findAll(@Query() query: FindAllQueryDto): Promise<VideosResponse> {
    return this.videoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<VideoResponse> {
    return this.videoService.findOne(id);
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto): Promise<VideoResponse> {
    return this.videoService.create(createVideoDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<VideoResponse> {
    return this.videoService.delete(id);
  }
}
