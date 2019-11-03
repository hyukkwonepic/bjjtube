import React from 'react';

import * as S from './styles';

import LogoSvg from '../LogoSvg';
import Link from 'next/link';

const Header = () => {
  return (
    <S.Header>
      <S.Container>
        <S.Logo>
          <LogoSvg />
          <span>BJJTube</span>
        </S.Logo>

        <S.Nav>
          <ul>
            <li>
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
            </li>
          </ul>
        </S.Nav>
      </S.Container>
    </S.Header>
  );
};

export default Header;
