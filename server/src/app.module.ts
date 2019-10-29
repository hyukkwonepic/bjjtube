import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule, Route } from 'nest-router';

import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { routes } from './routes';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(routes),
    VideoModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
