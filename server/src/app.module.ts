import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoModule } from './video/video.module';

@Module({
  imports: [TypeOrmModule.forRoot(), VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
