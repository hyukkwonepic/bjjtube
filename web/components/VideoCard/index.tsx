import Link from 'next/link';
import { format } from 'timeago.js';

import * as S from './styles';

const VideoCard = ({
  id,
  title,
  description,
  thumbnailUrl,
  user,
  createdAt
}) => {
  const { username } = user;
  const timeago = format(createdAt);
  return (
    <S.VideoCard>
      <Link href={`/videos/${id}`}>
        <a>
          <S.Thumbnail>
            <img src={thumbnailUrl} />
          </S.Thumbnail>
          <S.Details>
            <S.Title>{title}</S.Title>
            <S.Info>
              <span>{username}</span>
              <span> · </span>
              <span>{timeago}</span>
            </S.Info>
          </S.Details>
        </a>
      </Link>
    </S.VideoCard>
  );
};

export default VideoCard;
