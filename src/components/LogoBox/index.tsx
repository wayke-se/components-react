import * as React from 'react';

import { waykeImage } from '../../utils/image';
import { Logo } from './wrapper';

interface ILogoBox {
  logo: string;
  logo2x?: string | null;
  alt?: string;
  wide?: boolean;
}

// A Wayke media logo is shown through cfit/v3 (as PNG, at the size it had); the
// box caps width and height as before.
const LogoBox = ({ logo, logo2x, alt, wide }: ILogoBox) => {
  const src = waykeImage(logo, { png: true });
  let logoRetina = src;

  if (logo2x) {
    logoRetina = `${waykeImage(logo2x, { png: true })} 2x`;
  }

  return <Logo src={src} srcSet={logoRetina} alt={alt} wide={wide} />;
};

export default LogoBox;
