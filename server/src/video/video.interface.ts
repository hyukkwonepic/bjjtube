import { Video } from './video.entity';

export interface VideosResponse {
  videos: Video[];
  count: number;
}
