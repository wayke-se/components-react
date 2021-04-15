import React, { useCallback } from 'react';

import useThumbnail from './useThumbnail';
import { QuickNavImg } from '../Gallery/wrapper';
import { onImageLoad, onImageError } from './utils';
import CustomPlayer from '../Video/CustomPlayer';

interface QuickNavEmbededProps {
  src?: string;
  index: number;
}

const QuickNavEmbeded = ({ src, index }: QuickNavEmbededProps) => {
  const thumbnail = useThumbnail(src);
  const onError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => onImageError(e, thumbnail),
    [thumbnail]
  );

  const onLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => onImageLoad(e, thumbnail),
    [thumbnail]
  );

  const customVideo = src?.toLowerCase().endsWith('.mp4');

  return thumbnail?.length ? (
    customVideo ? <CustomPlayer key={index} url={src} ratio="66.66%" />
      : <QuickNavImg onLoad={onLoad} src={thumbnail[0]} onError={onError} alt={`Bild ${index + 1}`} />
  ) : null;
};

export default QuickNavEmbeded;
