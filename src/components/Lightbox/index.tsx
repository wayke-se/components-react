import React from 'react';

import { Wrapper, UiBlock, Item, Img, CloseBtn } from './wrapper';
import { IconCancel } from '../Icon';
import VideoPlayer from '../Video/VideoPlayer';
import SphereFullscreen from '../Sphere/SphereFullscreen';
import { SearchItem_vehicle_media } from '../../@types/gql/SearchItem';

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
          {m.type === 'sphere' && (
            <Item>
              <SphereFullscreen url={m.files[0].url} />
            </Item>
          )}
          {m.type === 'embedded' && (
            <Item>
              <VideoPlayer url={m.files[0].url} />
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
