import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto, FindAllQueryDto } from './video.dto';
import { VideosResponse, VideoResponse } from './video.interface';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(query: FindAllQueryDto): Promise<VideosResponse> {
    const { page } = query;

    let skip = null; // offset
    const take = 20; // limit

    if (page > 0) {
      skip = (page - 1) * 20;
    }
    const [videos, count] = await this.videoRepository.findAndCount({
      skip,
      take,
    });

    return {
      videos,
      count,
    };
  }

  async findOne(id: string): Promise<VideoResponse> {
    const video = await this.videoRepository.findOne(id);
    return { video };
  }

  async create(video: CreateVideoDto): Promise<VideoResponse> {
    const createdVideo = await this.videoRepository.save(video);
    return { video: createdVideo };
  }

  async delete(id: string): Promise<VideoResponse> {
    const video = await this.videoRepository.findOne(id);
    await this.videoRepository.delete(id);
    return { video };
  }
}
