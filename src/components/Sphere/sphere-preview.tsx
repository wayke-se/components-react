import React, { SyntheticEvent } from 'react';
import SphereViewer from './sphere-viewer';
import MediaButton from '../Gallery/media-button';

const onMediaClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, func: () => void) => {
  e.stopPropagation();
  e.preventDefault();
  func();
};

type PropsType = {
  url: string;
  preview: string;
  navigationDisabled: boolean;
  visible: boolean;
  onDisableNavigation: () => void;
};

const SpherePreview = ({
  url,
  preview,
  visible,
  onDisableNavigation,
  navigationDisabled,
}: PropsType) => {
  if (!visible || (!navigationDisabled && visible)) {
    return (
      <div
        className="slick-slide-item"
        onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div>
          <div className="slick-slide-image-container">
            <img src={preview} alt="alt" className="slick-slide-image" />
            <MediaButton
              text="Starta 360° interiört"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
                onMediaClick(e, onDisableNavigation)
              }
            />
          </div>
        </div>
      </div>
    );
  }
  if (navigationDisabled && visible) {
    return (
      <div
        className="slick-slide-item"
        onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="slick-slide-image-container">
          <div className="slick-slide-image">
            <SphereViewer
              id={url}
              preview={url}
              src={url}
              autoLoad={true}
              onStart={onDisableNavigation}
              fullscreen={false}
              modifiers="parent-height"
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SpherePreview;
