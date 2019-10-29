import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async findOne(id: string): Promise<Video> {
    return await this.videoRepository.findOne(id);
  }

  async create(video: CreateVideoDto): Promise<Video> {
    return await this.videoRepository.save(video);
  }
}
