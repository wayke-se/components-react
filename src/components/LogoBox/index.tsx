import * as React from 'react';

import { Logo, Wrapper } from './wrapper';

interface ILogoBox {
  logo: string;
  alt?: string;
}

const LogoBox = ({ logo, alt }: ILogoBox) => (
  <Wrapper>
    <Logo src={logo} alt={alt} />
  </Wrapper>
);

export default LogoBox;
