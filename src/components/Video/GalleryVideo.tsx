import React, { useState, memo } from 'react';
import MediaButton from '../Gallery/MediaButton';
import Modal from '../Modal/index';
import CustomPlayer from './CustomPlayer';

interface GalleryVideo {
  src: string;
  index: number;
}

const GalleryVideo = ({ src, index }: GalleryVideo) => {
  const [modal, setModal] = useState<string>();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(src);
  };

  const onCloseModal = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setModal(undefined);
  };

  return (
    <>
      {modal && (
        <Modal title="Video" onClose={onCloseModal}>
          <CustomPlayer modal controls={true} url={modal} />
        </Modal>
      )}
      <CustomPlayer ratio="66.66%" key={index} url={src} />
      <MediaButton text="Spela video" onClick={onClick} />
    </>
  );
};

export default memo(GalleryVideo);
