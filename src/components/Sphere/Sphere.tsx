import React from 'react';
import SphereViewer from './SphereViewer';

type PropsType = {
  url: string;
};

const Sphere = ({ url }: PropsType) => <SphereViewer id={url} src={url} />;

export default Sphere;
