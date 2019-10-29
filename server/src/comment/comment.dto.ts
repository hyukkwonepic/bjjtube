import { Comment } from './comment.entity';

export class CreateCommentDto {
  readonly content: string;
}

export class CommentsResponseDto {
  readonly comments: Comment[];
  readonly count: number;
}

export class CommentResponseDto {
  readonly comment: {
    id: string;
    content: string;
  };
}
