import React, { lazy, useState, useEffect, Suspense } from 'react';

import { Wrapper } from '../Sphere/wrapper';
import Loader from '../Loader';

// Skip loading pannellum with video
const Pannellum = lazy(() => import('@wayke-se/pannellum-react'));

type PropsType = {
  id: string;
  src: string;
  preview: string;
  autoLoad?: boolean;
  onStart?: () => void;
};

const SphereViewer = ({ id, src, preview, autoLoad, onStart }: PropsType) => {
  const [number] = useState(Math.floor(100000000 + Math.random() * 900000000));
  useEffect(() => {
    setTimeout(() => {
      if (onStart) {
        const startBtn = document.querySelector('.pnlm-load-button');
        if (startBtn) startBtn.addEventListener('click', onStart);
      }
    }, 100);
  }, []);

  return (
    <Wrapper>
      <Suspense fallback={<Loader />}>
        <Pannellum
          id={`a-${id}-${number}`}
          panorama={src}
          hfov={120}
          autoLoad={autoLoad}
          compass
          width={'100%'}
          preview={preview}
        />
      </Suspense>
    </Wrapper>
  );
};

export default SphereViewer;
