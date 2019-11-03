import styled from 'styled-components';

export const VideoCard = styled.div`
  @media only screen and (min-width: 960px) {
    margin-bottom: 3.4rem;
  }

  a {
    text-decoration: unset;
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  padding-top: 56.25%;
  height: 0px;
  background: white;
  position: relative;

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    margin: auto;
  }
`;

export const Details = styled.div`
  padding: 1.4rem 2rem;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
`;
export const Info = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: white;
`;
