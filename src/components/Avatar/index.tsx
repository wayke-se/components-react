import React from 'react';

import { waykeImage } from '../../utils/image';
import { Wrapper } from './wrapper';

interface Props {
  image: string;
  alt?: string;
}

// The 40×40 box crops (background-size: cover); 96 covers it at DPR 2.
const Avatar = ({ image, alt }: Props) => (
  <Wrapper image={waykeImage(image, { width: 96 })} aria-label={alt} />
);

export default Avatar;
