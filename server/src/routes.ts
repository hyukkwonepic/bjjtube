import { Routes } from 'nest-router';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';

export const routes: Routes = [
  {
    path: '/videos',
    module: VideoModule,
    children: [
      {
        path: ':videoId/comments',
        module: CommentModule,
      },
    ],
  },
];
