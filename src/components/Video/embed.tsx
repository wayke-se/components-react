import React, { useState } from 'react';

import useThumbnail from './useThumbnail';
import { Image } from '../Gallery/wrapper';
import MediaButton from '../Gallery/media-button';
import Modal from '../Modal';
import VideoPlayer from './video-player';

interface Embed {
  src: string;
  index: number;
}

const Embed = ({ src, index }: Embed) => {
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
        <Modal title={''} onClose={onCloseModal}>
          <VideoPlayer url={modal} />
        </Modal>
      )}
      <Image src={`${thumbnail}`} alt={`Bild ${index + 1}`} />
      <MediaButton text="Spela video" onClick={onClick} />
    </>
  ) : null;
};

export default Embed;
