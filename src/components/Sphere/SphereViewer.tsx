import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { CompassPlugin } from '@photo-sphere-viewer/compass-plugin';
import '@photo-sphere-viewer/core/index.css';

import { Wrapper } from '../Sphere/wrapper';
import Loader from '../Loader';

type PropsType = {
  id: string;
  src: string;
  preview: string;
  autoLoad?: boolean;
  onStart?: () => void;
};

const isWebgl2Supported = (): boolean => {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
};

const SphereViewer = ({ id, src, preview, autoLoad, onStart }: PropsType) => {
  const container = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [started, setStarted] = useState(!!autoLoad);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!started || !container.current) return;
    if (!isWebgl2Supported()) return;

    setLoading(true);

    let viewer: Viewer;
    try {
      viewer = new Viewer({
        container: container.current,
        panorama: src,
        defaultZoomLvl: 50,
        navbar: ['zoom', 'fullscreen'],
        plugins: [CompassPlugin],
      });
    } catch {
      setLoading(false);
      return;
    }
    viewerRef.current = viewer;

    const handleReady = () => setLoading(false);
    viewer.addEventListener('ready', handleReady);

    return () => {
      viewer.removeEventListener('ready', handleReady);
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [started, src]);

  const handleStart = () => {
    setStarted(true);
    if (onStart) onStart();
  };

  return (
    <Wrapper>
      {!started && (
        <button
          type="button"
          id={`a-${id}-start`}
          onClick={handleStart}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${preview})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Start 360 view"
        />
      )}
      {started && loading && <Loader />}
      {started && <div ref={container} style={{ width: '100%', height: '100%' }} />}
    </Wrapper>
  );
};

export default SphereViewer;
