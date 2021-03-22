import React from 'react';

import CustomPlayer from './CustomPlayer';

interface QuickNavVideo {
  src?: string;
  index: number;
}

const QuickNavVideo = ({ src, index }: QuickNavVideo) => {
  return <CustomPlayer key={index} url={src} ratio="66.666%" />;
};

export default QuickNavVideo;
