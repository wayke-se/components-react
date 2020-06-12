import React from 'react';
import SphereViewer from './sphere-viewer';

type PropsType = {
  url: string;
};

const SphereFullscreen = ({ url }: PropsType) => (
  <div
    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <SphereViewer id={url} src={url} preview={url} fullscreen={true} />
  </div>
);

export default SphereFullscreen;
