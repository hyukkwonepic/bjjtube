import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import {
  CreateVideoDto,
  FindAllQueryDto,
  VideosResponseDto,
  VideoResponseDto,
} from './video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(query: FindAllQueryDto): Promise<VideosResponseDto> {
    const { page } = query;

    let skip = null; // offset
    const take = 20; // limit

    if (page > 0) {
      skip = (page - 1) * 20;
    }
    const [videos, count] = await this.videoRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });

    return {
      videos,
      count,
    };
  }

  async findOne(id: string): Promise<VideoResponseDto> {
    const video = await this.videoRepository.findOne(id);
    return { video };
  }

  async create(video: CreateVideoDto): Promise<VideoResponseDto> {
    const createdVideo = await this.videoRepository.save(video);
    return { video: createdVideo };
  }

  async delete(id: string): Promise<VideoResponseDto> {
    const video = await this.videoRepository.findOne(id);
    await this.videoRepository.delete(id);
    return { video };
  }
}
