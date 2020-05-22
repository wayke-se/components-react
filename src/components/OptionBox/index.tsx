import * as React from 'react';

import { Logo, Content, Wrapper } from './wrapper';
import LogoBox from '../LogoBox';

interface IOptionBox {
  logo?: string;
  logo2x?: string;
  logoAlt?: string;
  children: JSX.Element | JSX.Element[];
}

const OptionBox = ({ logo, logo2x, logoAlt, children }: IOptionBox) => (
  <Wrapper>
    {logo && (
      <Logo>
        <LogoBox logo={logo} logo2x={logo2x} alt={logoAlt} />
      </Logo>
    )}
    <Content>{children}</Content>
  </Wrapper>
);

export default OptionBox;
