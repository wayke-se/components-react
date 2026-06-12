import React from 'react';
import { useTranslation } from 'react-i18next';
import { Media } from '../../@types/codegen/types';
import { IconCancel } from '../Icon';
import SphereLightbox from '../Sphere/SphereLightbox';
import ThreeSixtyLightbox from '../ThreeSixty/ThreeSixtLightbox';
import EmbeddedVideoLightbox from '../Video/EmbeddedVideoLightbox';
import { CloseBtn, Img, Item, UiBlock, Wrapper } from './wrapper';

interface LightboxProps {
  index: number;
  media: Media[];
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
              src={m.files[0].url}
              alt={t('common.imageIndex', { index: i + 1 }) || ''}
            />
          )}
          {m.type === 'threesixty' && <ThreeSixtyLightbox urls={m.files.map((x) => x.url)} />}
          {m.type === 'sphere' && <SphereLightbox url={m.files[0].url} />}
          {m.type === 'embedded' && <EmbeddedVideoLightbox url={m.files[0].url} />}
        </Item>
      ))}
      <CloseBtn onClick={onClose} title={t('common.close') || ''}>
        <IconCancel block />
      </CloseBtn>
    </Wrapper>
  );
};

export default Lightbox;
