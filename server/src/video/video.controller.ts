import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.entity';
import { CreateVideoDto } from './video.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/')
  findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Video> {
    return this.videoService.findOne(id);
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videoService.create(createVideoDto);
  }
}
