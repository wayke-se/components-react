import React from 'react';

import useThumbnail from './useThumbnail';
import { Image } from './wrapper';

interface Embed {
  src: string;
  index: number;
}

const Embed = ({ src, index }: Embed) => {
  const [thumbnail] = useThumbnail(src);
  return thumbnail ? <Image src={`${thumbnail}`} alt={`Bild ${index + 1}`} /> : null;
};

export default Embed;
