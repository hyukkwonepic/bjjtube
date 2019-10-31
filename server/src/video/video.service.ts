import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto, UpdateVideoDto } from './video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(page?: number): Promise<[Video[], number]> {
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
      .where('Video.id = :videoId', { videoId: id })
      .leftJoin('Video.user', 'User')
      .select(['Video', 'User.id', 'User.username'])
      .getOne();
  }

  async create(userId: string, createVideoDto: CreateVideoDto): Promise<Video> {
    const { identifiers } = await this.videoRepository
      .createQueryBuilder()
      .insert()
      .into(Video)
      .values({
        ...createVideoDto,
        user: {
          id: userId,
        },
      })
      .execute();

    const [{ id }] = identifiers;

    return await this.videoRepository
      .createQueryBuilder()
      .where('Video.id = :id', { id })
      .getOne();
  }

  async update(
    userId: string,
    videoId: string,
    updateVideoDto: UpdateVideoDto,
  ): Promise<Video> {
    const videoQueryBuilder = this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select(['Video', 'User.id'])
      .where('Video.id = :videoId', { videoId });

    const video = await videoQueryBuilder.getOne();

    if (video.user.id !== userId) {
      throw new UnauthorizedException();
    }

    await this.videoRepository
      .createQueryBuilder()
      .update(Video)
      .set(updateVideoDto)
      .where('Video.id = :videoId', { videoId })
      .execute();

    return await videoQueryBuilder.getOne();
  }

  async delete(userId: string, videoId: string): Promise<Video> {
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
      .where('Video.id = :videoId', { videoId })
      .execute();

    return video;
  }
}
