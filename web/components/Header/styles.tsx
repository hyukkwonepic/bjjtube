import styled from 'styled-components';

export const Header = styled.header`
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;

  @media only screen and (min-width: 960px) {
    max-width: 100.4rem;
    margin: 0 auto;
    padding: 0;
  }
`;

export const Logo = styled.div`
  svg {
    margin-right: 1rem;
    vertical-align: middle;

    path {
      fill: #03d1b2;
    }
  }

  span {
    vertical-align: middle;
    color: white;
    font-size: 2.8rem;
    font-weight: 900;
    font-style: italic;
  }
`;

export const Nav = styled.nav`
  ul {
    padding: unset;
    margin: unset;
    li {
      list-style: unset;
      display: inline-block;
      margin-left: 2rem;

      a {
        font-size: 1.6rem;
        color: white;
        font-weight: 700;
        text-decoration: unset;
      }
    }
  }
`;
