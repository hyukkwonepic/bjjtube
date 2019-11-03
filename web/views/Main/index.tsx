import { NextPage } from 'next';
import { useQuery } from 'react-fetching-library';

import { client } from '../../libs/fetching';

import * as S from './styles';
import * as A from './actions';

import Header from '../../components/Header';
import VideoCard from '../../components/VideoCard';

const Main: NextPage = () => {
  const { loading, payload, error, query } = useQuery(A.getVideos(), true);

  let videoCards = null;
  if (!loading && !error && payload) {
    const { videos } = payload;
    videoCards = videos.map(video => {
      const { id } = video;
      return <VideoCard key={id} {...video} />;
    });
  }

  return (
    <S.Main>
      <Header />
      <S.Section>
        <S.Title>Trending videos</S.Title>
        <S.Container>{videoCards}</S.Container>
      </S.Section>
    </S.Main>
  );
};

Main.getInitialProps = async () => {
  await client.query(A.getVideos());
  return {};
};

export default Main;
