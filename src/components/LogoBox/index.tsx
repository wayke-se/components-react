import * as React from 'react';

import { Logo } from './wrapper';

interface ILogoBox {
  logo: string;
  logo2x?: string | null;
  alt?: string;
  wide?: boolean;
}

const LogoBox = ({ logo, logo2x, alt, wide }: ILogoBox) => {
  let logoRetina = logo;

  if (logo2x) {
    logoRetina = `${logo2x} 2x`;
  }

  return <Logo src={logo} srcSet={logoRetina} alt={alt} wide={wide} />;
};

export default LogoBox;
