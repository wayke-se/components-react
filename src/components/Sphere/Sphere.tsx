import React from 'react';
import SphereViewer from './SphereViewer';

type PropsType = {
  url: string;
  onDisableNavigation: () => void;
};

const Sphere = ({ url, onDisableNavigation }: PropsType) => (
  <SphereViewer id={url} src={url} onStart={onDisableNavigation} />
);

export default Sphere;
