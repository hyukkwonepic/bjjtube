import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule, Route } from 'nest-router';

import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { routes } from './routes';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(routes),
    VideoModule,
    CommentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
