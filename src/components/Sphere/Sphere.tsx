import React from 'react';
import SphereViewer from './SphereViewer';

type PropsType = {
  url: string;
  visible: boolean;
  onDisableNavigation: () => void;
};

const Sphere = ({ url, visible, onDisableNavigation }: PropsType) => {
  if (!visible) return null;
  return <SphereViewer id={url} src={url} onStart={onDisableNavigation} />;
};

export default Sphere;
