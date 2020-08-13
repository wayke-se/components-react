import React, { useState, useCallback } from 'react';

import useThumbnail from './useThumbnail';
import { ImageFull } from '../Gallery/wrapper';
import MediaButton from '../Gallery/MediaButton';
import Modal from '../Modal/index';
import VideoPlayer from './EmbeddedVideoLightbox';
import { onImageLoad, onImageError } from './utils';

interface GalleryEmbed {
  src: string;
  index: number;
}

const GalleryEmbed = ({ src, index }: GalleryEmbed) => {
  const [modal, setModal] = useState<string>();
  const thumbnail = useThumbnail(src);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(src);
  };

  const onCloseModal = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(undefined);
  };

  const onError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => onImageError(e, thumbnail),
    [thumbnail]
  );

  const onLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => onImageLoad(e, thumbnail),
    [thumbnail]
  );

  return thumbnail?.length ? (
    <>
      {modal && (
        <Modal title="Video" onClose={onCloseModal}>
          <VideoPlayer url={modal} />
        </Modal>
      )}
      <ImageFull onLoad={onLoad} src={thumbnail[0]} onError={onError} alt={`Bild ${index + 1}`} />
      <MediaButton text="Spela video" onClick={onClick} />
    </>
  ) : null;
};

export default GalleryEmbed;
