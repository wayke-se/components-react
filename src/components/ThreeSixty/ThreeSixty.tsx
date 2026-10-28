import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from '../Gallery/wrapper';
import ResponsiveImage from '../ResponsiveImage';
import { Badge } from './wrapper';

// As the gallery's own images.
const WIDTHS = [375, 600, 750, 1000, 1200];
const SIZES = '(min-width: 1200px) 800px, (min-width: 768px) calc(100vw - 180px), 95vw';

type PropsType = {
  urls: string[];
};

/**
 * A 360 image in the gallery: its first frame, marked as 360. A click opens the
 * lightbox, where it turns at once, as on wayke.se; turning it here would take
 * the swipe away from the gallery.
 */
const ThreeSixty = ({ urls }: PropsType) => {
  const { t } = useTranslation();
  return (
    <>
      <Badge>{t('item.threeSixty.badge')}</Badge>
      <ResponsiveImage
        img={Image}
        src={urls[0]}
        widths={WIDTHS}
        sizes={SIZES}
        alt={t('item.threeSixty.badge')}
        loading="lazy"
        draggable={false}
      />
    </>
  );
};

export default ThreeSixty;
