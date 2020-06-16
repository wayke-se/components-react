import React, { useState, useCallback } from 'react';

import { Image } from '../Gallery/wrapper';
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
      <>
        <Image src={urls[0]} alt="alt" />
        <MediaButton text="Starta 360° exteriört" onClick={onStart} />
      </>
    );
  }

  return (
    <div data-am-image360 data-description="Dra i bilden för att rotera den.">
      <Rotation>
        {urls.map((image, i) => (
          <Image key={image} src={image} alt={`Bild ${i + 1}`} />
        ))}
      </Rotation>
    </div>
  );
};

export default ThreeSixtyLightbox;
