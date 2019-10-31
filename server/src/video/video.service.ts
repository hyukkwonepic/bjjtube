import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async findAll(query: FindAllQueryDto): Promise<[Video[], number]> {
    const { page } = query;

    let offset = null;
    const limit = 20;

    if (page > 0) {
      offset = (page - 1) * 20;
    }

    return await this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .orderBy('Video.createdAt', 'DESC')
      .select(['Video', 'User.id', 'User.username'])
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }

  async findOne(id: string): Promise<Video> {
    return await this.videoRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async create(userId: string, video: CreateVideoDto): Promise<Video> {
    const { identifiers } = await this.videoRepository
      .createQueryBuilder()
      .insert()
      .into(Video)
      .values({
        ...video,
        user: {
          id: userId,
        },
      })
      .execute();

    const [{ id }] = identifiers;

    return await this.videoRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async delete(videoId: string, userId: string): Promise<Video> {
    const video = await this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select(['Video', 'User.id'])
      .where('Video.id = :videoId', { videoId })
      .getOne();

    if (video.user.id !== userId) {
      throw new UnauthorizedException();
    }

    await this.videoRepository
      .createQueryBuilder()
      .delete()
      .from(Video)
      .where('id = :videoId', { videoId })
      .execute();

    return video;
  }
}
