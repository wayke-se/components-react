import React from 'react';

import { Wrapper, UiBlock, Item, Img, CloseBtn } from './wrapper';
import { IconCancel } from '../Icon';
import EmbeddedVideoLightbox from '../Video/EmbeddedVideoLightbox';
import SphereLightbox from '../Sphere/SphereLightbox';
import { SearchItem_vehicle_media } from '../../@types/gql/SearchItem';
import ThreeSixtyLightbox from '../ThreeSixty/ThreeSixtLightbox';

interface LightboxProps {
  index: number;
  media: SearchItem_vehicle_media[];
  onClose: () => void;
}

const Lightbox = ({ index, media, onClose }: LightboxProps) => {
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
      {media.map((m, i) => (
        <>
          {m.type === 'image' && (
            <Item>
              <Img
                key={m.files[0].url}
                ref={index === i ? onRef : undefined}
                id={`lightbox-image-${i}`}
                src={m.files[0].url}
                alt={`Bild ${i + 1}`}
              />
            </Item>
          )}
          {m.type === 'threesixty' && (
            <Item>
              <ThreeSixtyLightbox urls={m.files.map((x) => x.url)} />
            </Item>
          )}
          {m.type === 'sphere' && (
            <Item>
              <SphereLightbox url={m.files[0].url} />
            </Item>
          )}
          {m.type === 'embedded' && (
            <Item>
              <EmbeddedVideoLightbox url={m.files[0].url} />
            </Item>
          )}
        </>
      ))}
      <CloseBtn onClick={onClose} title="Stäng">
        <IconCancel block />
      </CloseBtn>
    </Wrapper>
  );
};

export default Lightbox;
