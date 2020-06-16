import React from 'react';

import { Image } from '../Gallery/wrapper';
import MediaButton from '../Gallery/MediaButton';
import Rotation from './Rotation';

const onMediaClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, func: () => void) => {
  e.stopPropagation();
  e.preventDefault();
  func();
};

type PropsType = {
  urls: string[];
  fullscreen?: boolean;
  navigationDisabled: boolean;
  visible: boolean;
  onDisableNavigation: () => void;
};

const ThreeSixty = ({
  urls,
  fullscreen,
  visible,
  onDisableNavigation,
  navigationDisabled,
}: PropsType) => {
  if (!visible || (!navigationDisabled && visible)) {
    return (
      <>
        <Image src={urls[0]} alt="alt" />
        <MediaButton
          text="Starta 360° exteriört"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
            onMediaClick(e, onDisableNavigation)
          }
        />
      </>
    );
  }
  if (navigationDisabled && visible) {
    return (
      <div
        data-am-image360={fullscreen ? '' : 'contain'}
        data-description="Dra i bilden för att rotera den."
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Rotation>
          {urls.map((image, i) => (
            <Image key={image} src={image} alt={`Bild ${i + 1}`} />
          ))}
        </Rotation>
      </div>
    );
  }
  return null;
};

export default ThreeSixty;
