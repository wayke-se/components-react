import React from 'react';

import { Wrapper, UiBlock, Img, CloseBtn } from './wrapper';
import { IconCancel } from '../Icon';

interface ImageProps {
  url: string;
}

interface LightboxProps {
  images: ImageProps[];
  onClose: () => void;
}

const Lightbox = ({ images, onClose }: LightboxProps) => (
  <Wrapper>
    <UiBlock onClick={onClose} aria-hidden />
    {images.map(({ url }: ImageProps, i) => (
      <Img key={url} src={`${url}`} alt={`Bild ${i + 1}`} />
    ))}
    <CloseBtn onClick={onClose} title="Stäng">
      <IconCancel block />
    </CloseBtn>
  </Wrapper>
);

export default Lightbox;
