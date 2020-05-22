import * as React from 'react';

import { Logo, Wrapper } from './wrapper';

interface ILogoBox {
  logo: string;
  alt?: string;
  wide?: boolean;
}

const LogoBox = ({ logo, alt, wide }: ILogoBox) => (
  <Wrapper wide={wide}>
    <Logo src={logo} alt={alt} />
  </Wrapper>
);

export default LogoBox;
