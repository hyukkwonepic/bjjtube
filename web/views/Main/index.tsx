import { NextPage } from 'next';
import { useQuery } from 'react-fetching-library';
import Grid from '@material-ui/core/Grid';

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
      return (
        <Grid key={id} item xs={12} md={4}>
          <VideoCard {...video} />
        </Grid>
      );
    });
  }

  return (
    <S.Main>
      <Header />
      <S.Section>
        <S.Container>
          <S.Title>Trending videos</S.Title>
          <Grid container spacing={2}>
            {videoCards}
          </Grid>
        </S.Container>
      </S.Section>
    </S.Main>
  );
};

Main.getInitialProps = async () => {
  await client.query(A.getVideos());
  return {};
};

export default Main;
