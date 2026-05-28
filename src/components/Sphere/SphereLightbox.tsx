import React from 'react';
import SphereViewer from './SphereViewer';

type PropsType = {
  url: string;
};

const SphereLightbox = ({ url }: PropsType) => <SphereViewer id={url} src={url} interactive />;

export default SphereLightbox;
