import React from 'react';

import { Wrapper, UiBlock, Img, CloseBtn } from './wrapper';
import { IconCancel } from '../Icon';

interface ImageProps {
  gallery: string;
  thumbnail: string;
  lightbox: string;
  type: string;
}

interface LightboxProps {
  index: number;
  images: ImageProps[];
  onClose: () => void;
}

const Lightbox = ({ index, images, onClose }: LightboxProps) => {
  const onRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      setTimeout(() => {
        ref.scrollIntoView();
      }, 100);
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
      {images.map(({ lightbox }: ImageProps, i) => (
        <Img
          key={lightbox}
          ref={index === i ? onRef : undefined}
          id={`lightbox-image-${i}`}
          src={`${lightbox}`}
          alt={`Bild ${i + 1}`}
        />
      ))}
      <CloseBtn onClick={onClose} title="Stäng">
        <IconCancel block />
      </CloseBtn>
    </Wrapper>
  );
};

export default Lightbox;
