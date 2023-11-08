import React, { useCallback } from 'react';

import useThumbnail from './useThumbnail';
import { QuickNavImg } from '../Gallery/wrapper';
import { onImageLoad, onImageError } from './utils';
import CustomPlayer from '../Video/CustomPlayer';
import { useTranslation } from 'react-i18next';

interface QuickNavEmbededProps {
  src?: string;
  index: number;
}

const QuickNavEmbeded = ({ src, index }: QuickNavEmbededProps) => {
  const { t } = useTranslation();
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

  if (thumbnail?.length && !customVideo)
    return (
      <QuickNavImg
        onLoad={onLoad}
        src={thumbnail[0]}
        onError={onError}
        alt={t('common.imageIndex', { index: index + 1 }) || ''}
      />
    );
  if (customVideo) return <CustomPlayer key={index} url={src} ratio="66.66%" />;
  return null;
};

export default QuickNavEmbeded;
