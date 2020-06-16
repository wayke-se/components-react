import React from 'react';

import useThumbnail from './useThumbnail';
import { QuickNavImg } from '../Gallery/wrapper';

interface QuickNavEmbededProps {
  src: string;
  index: number;
}

const QuickNavEmbeded = ({ src, index }: QuickNavEmbededProps) => {
  const [thumbnail] = useThumbnail(src);
  return thumbnail ? <QuickNavImg src={`${thumbnail}`} alt={`Bild ${index + 1}`} /> : null;
};

export default QuickNavEmbeded;
