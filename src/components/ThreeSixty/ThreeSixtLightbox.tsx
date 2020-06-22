import React, { useState, useCallback } from 'react';

import { Item, Img } from '../Lightbox/wrapper';
import MediaButton from '../Gallery/MediaButton';
import Rotation from './Rotation';

type PropsType = {
  urls: string[];
};

const ThreeSixtyLightbox = ({ urls }: PropsType) => {
  const [started, setStarted] = useState(false);

  const onStart = useCallback(() => setStarted(true), []);

  if (!started) {
    return (
      <Item>
        <Img src={urls[0]} alt="alt" />
        <MediaButton text="Starta 360° exteriört" onClick={onStart} />
      </Item>
    );
  }

  return (
    <Rotation>
      {urls.map((image, i) => (
        <Img key={image} src={image} alt={`Bild ${i + 1}`} />
      ))}
    </Rotation>
  );
};

export default ThreeSixtyLightbox;
