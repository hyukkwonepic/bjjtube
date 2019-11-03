import styled from 'styled-components';

export const Main = styled.div`
  min-height: 100%;
  background-color: #1f1f1f;
`;

export const Section = styled.section`
  height: 100%;
  padding-top: 6rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 900;
  color: white;
  margin-left: 2rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media only screen and (min-width: 960px) {
    margin-left: 0rem;
    margin-top: 5rem;
  }
`;

export const Container = styled.div`
  @media only screen and (min-width: 960px) {
    max-width: 100.4rem;
    margin: 0 auto;
    padding: 0;
  }
`;
