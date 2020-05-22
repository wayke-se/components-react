import * as React from 'react';

import { Logo, Content, Wrapper } from './wrapper';
import LogoBox from '../LogoBox';

interface IOptionBox {
  logo?: string;
  logoAlt?: string;
  children: JSX.Element | JSX.Element[];
}

const OptionBox = ({ logo, logoAlt, children }: IOptionBox) => (
  <Wrapper>
    {logo && (
      <Logo>
        <LogoBox logo={logo} alt={logoAlt} />
      </Logo>
    )}
    <Content>{children}</Content>
  </Wrapper>
);

export default OptionBox;
