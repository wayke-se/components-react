import React, { useState } from 'react';

import useThumbnail from './useThumbnail';
import { ImageFull } from '../Gallery/wrapper';
import MediaButton from '../Gallery/MediaButton';
import Modal from '../Modal/index';
import VideoPlayer from './EmbeddedVideoLightbox';

interface GalleryEmbed {
  src: string;
  index: number;
}

const GalleryEmbed = ({ src, index }: GalleryEmbed) => {
  const [modal, setModal] = useState<string>();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(src);
  };

  const onCloseModal = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(undefined);
  };

  const [thumbnail] = useThumbnail(src);
  return thumbnail ? (
    <>
      {modal && (
        <Modal title="Video" onClose={onCloseModal}>
          <VideoPlayer url={modal} />
        </Modal>
      )}
      <ImageFull src={`${thumbnail}`} alt={`Bild ${index + 1}`} />
      <MediaButton text="Spela video" onClick={onClick} />
    </>
  ) : null;
};

export default GalleryEmbed;
