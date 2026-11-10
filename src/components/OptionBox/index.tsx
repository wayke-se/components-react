import * as React from 'react';

import { waykeImage } from '../../utils/image';
import { Content, Logo, LogoImg, Wrapper } from './wrapper';

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
        <LogoImg
          // A Wayke media logo through cfit/v3, as PNG at the size it had.
          src={waykeImage(logo, { png: true })}
          srcSet={waykeImage(logo2x, { png: true })}
          alt={logoAlt}
        />
      </Logo>
    )}
    <Content>{children}</Content>
  </Wrapper>
);

export default OptionBox;
