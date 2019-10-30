import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Video } from '../video/video.entity';
import { User } from '../user/user.entity';

@Entity({
  name: 'Comment',
})
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => Video, video => video.comments)
  video: Video;

  @ManyToOne(type => User, user => user.comments)
  user: User;
}
