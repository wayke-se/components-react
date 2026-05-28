import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { useTranslation } from 'react-i18next';
import '@photo-sphere-viewer/core/index.css';

import { Wrapper } from '../Sphere/wrapper';
import Loader from '../Loader';
import MediaButton from '../Gallery/MediaButton';

type PropsType = {
  id: string;
  src: string;
  onStart?: () => void;
};

const isWebgl2Supported = (): boolean => {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
};

const SphereViewer = ({ id, src, onStart }: PropsType) => {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    if (!isWebgl2Supported()) return;

    let viewer: Viewer;
    try {
      viewer = new Viewer({
        container: container.current,
        panorama: src,
        navbar: ['zoom', 'fullscreen'],
        defaultYaw: 0,
        defaultPitch: 0,
        mousewheel: false,
        touchmoveTwoFingers: true,
        minFov: 30,
        maxFov: 90,
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
  }, [src]);

  const handleStart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setStarted(true);
    if (onStart) onStart();
  };

  const fillStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <Wrapper>
      <div
        id={`a-${id}`}
        ref={container}
        style={{ ...fillStyle, pointerEvents: started ? 'auto' : 'none' }}
      />
      {loading && <Loader />}
      {!loading && !started && (
        <div style={{ ...fillStyle, pointerEvents: 'none' }}>
          <MediaButton text={t('item.start360Interior')} onClick={handleStart} />
        </div>
      )}
    </Wrapper>
  );
};

export default SphereViewer;
