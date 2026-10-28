import React from 'react';
import { useTranslation } from 'react-i18next';
import { GalleryMedia } from '../../Gql/ad/view';
import { IconCancel } from '../Icon';
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
            <Img
              id={`lightbox-image-${i}`}
              src={m.urls[0]}
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
