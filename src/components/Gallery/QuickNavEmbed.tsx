import React from 'react';

import useThumbnail from '../Video/useThumbnail';
import { QuickNavImg } from './wrapper';

interface QuickNavEmbedProps {
  src: string;
  index: number;
}

const QuickNavEmbed = ({ src, index }: QuickNavEmbedProps) => {
  const [thumbnail] = useThumbnail(src);
  return thumbnail ? <QuickNavImg src={`${thumbnail}`} alt={`Bild ${index + 1}`} /> : null;
};

export default QuickNavEmbed;
