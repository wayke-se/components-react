import * as React from 'react';

import { Logo, LogoImg, Content, Wrapper } from './wrapper';

interface IOptionBox {
  logo?: string;
  logo2x?: string;
  logoAlt?: string;
  children: React.ReactNode;
}

const OptionBox = ({ logo, logo2x, logoAlt, children }: IOptionBox) => (
  <Wrapper>
    {logo && (
      <Logo>
        <LogoImg src={logo} srcSet={logo2x} alt={logoAlt} />
      </Logo>
    )}
    <Content>{children}</Content>
  </Wrapper>
);

export default OptionBox;
