import React, { useState, useCallback } from 'react';

import useThumbnail from './useThumbnail';
import { ImageFull } from '../Gallery/wrapper';
import MediaButton from '../Gallery/MediaButton';
import Modal from '../Modal/index';
import VideoPlayer from './EmbeddedVideoLightbox';
import { onImageLoad, onImageError } from './utils';
import CustomPlayer from '../Video/CustomPlayer';
import ColorSelect from '../ColorSelect';

interface GalleryEmbed {
  src: string;
  index: number;
  controls?: boolean;
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

  const customVideo = src.toLowerCase().endsWith('.mp4');

  if (thumbnail?.length && !customVideo) {
    return (
      <>
        <ImageFull onLoad={onLoad} src={thumbnail[0]} onError={onError} alt={`Bild ${index + 1}`} />
        <MediaButton text="Spela video" onClick={onClick} />
        {modal && (
          <Modal title="Video" onClose={onCloseModal}>
            <VideoPlayer url={modal} />
          </Modal>
        )}
      </>
    )
  }

  if (customVideo)
    return (
      <>
        <CustomPlayer ratio="66.66%" isPreview controls={false} url={src} />
        <MediaButton text="Spela video" onClick={onClick} />
        {modal && (
          <Modal title="Video" onClose={onCloseModal}>
            <VideoPlayer url={modal} />
          </Modal>
        )}
      </>
    )
  return null;
};

export default GalleryEmbed;
