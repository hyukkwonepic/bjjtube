import { Routes } from 'nest-router';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

export const routes: Routes = [
  {
    path: null,
    module: AuthModule,
  },
  {
    path: '/user',
    module: UserModule,
  },
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
