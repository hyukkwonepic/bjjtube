import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Video } from '../video/video.entity';
import { Comment } from '../comment/comment.entity';

@Entity({
  name: 'User',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(type => Video, video => video.user)
  videos: Video[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
}
