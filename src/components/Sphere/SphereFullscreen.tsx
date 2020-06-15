import React from 'react';
import SphereViewer from './SphereViewer';

type PropsType = {
  url: string;
};

const SphereFullscreen = ({ url }: PropsType) => <SphereViewer id={url} src={url} preview={url} />;

export default SphereFullscreen;
