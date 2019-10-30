import { Video } from './video.entity';

export class CreateVideoDto {
  readonly videoUrl: string;
  readonly title: string;
  readonly description?: string;
}

export class FindAllQueryDto {
  readonly page?: number;
}

export class VideosResponseDto {
  readonly videos: Video[];
  readonly count: number;
}

export class VideoResponseDto {
  readonly video: Video;
}