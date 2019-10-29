import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Comment } from '../comment/comment.entity';

@Entity({
  name: 'Video',
})
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  videoUrl: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(type => Comment, comment => comment.video)
  comments: Comment[];
}
