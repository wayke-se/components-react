import React from 'react';
import { useTranslation } from 'react-i18next';
import { GalleryMedia } from '../../Gql/ad/view';
import { IconCancel } from '../Icon';
import ResponsiveImage from '../ResponsiveImage';
import SphereLightbox from '../Sphere/SphereLightbox';
import ThreeSixtyLightbox from '../ThreeSixty/ThreeSixtLightbox';
import EmbeddedVideoLightbox from '../Video/EmbeddedVideoLightbox';
import { CloseBtn, Img, Item, UiBlock, Wrapper } from './wrapper';

interface LightboxProps {
  index: number;
  media: GalleryMedia[];
  onClose: () => void;
}

const Lightbox = ({ index, media, onClose }: LightboxProps) => {
  const { t } = useTranslation();
  const onRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      setTimeout(() => {
        ref.scrollIntoView();
      }, 300);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  return (
    <Wrapper ref={(ref) => ref?.focus()} onKeyDown={onKeyDown} tabIndex={0}>
      <UiBlock onClick={onClose} aria-hidden />
      {media.map((m, i) => (
        <Item key={i} ref={index === i ? onRef : undefined}>
          {m.type === 'image' && (
            <ResponsiveImage
              img={Img}
              id={`lightbox-image-${i}`}
              src={m.urls[0]}
              widths={[750, 1080, 1200, 1920]}
              // As wide as the screen, or as the screen is high for a 3:2 image.
              sizes="(min-aspect-ratio: 3/2) 150vh, 100vw"
              // Reserves the 3:2 box, so only the images near the one opened load.
              width={1200}
              height={800}
              loading="lazy"
              alt={t('common.imageIndex', { index: i + 1 }) || ''}
            />
          )}
          {m.type === 'threesixty' && <ThreeSixtyLightbox urls={m.urls} />}
          {m.type === 'sphere' && <SphereLightbox url={m.urls[0]} />}
          {m.type === 'embedded' && <EmbeddedVideoLightbox url={m.urls[0]} />}
        </Item>
      ))}
      <CloseBtn onClick={onClose} title={t('common.close') || ''}>
        <IconCancel block />
      </CloseBtn>
    </Wrapper>
  );
};

export default Lightbox;
