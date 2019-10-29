import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto, FindAllQueryDto } from './video.dto';
import { VideosResponse } from './video.interface';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(query: FindAllQueryDto): Promise<VideosResponse> {
    const { page } = query;

    let skip = null;
    const take = 20;

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

  async findOne(id: string): Promise<Video> {
    return await this.videoRepository.findOne(id);
  }

  async create(video: CreateVideoDto): Promise<Video> {
    return await this.videoRepository.save(video);
  }
}
