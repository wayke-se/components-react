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
  interactive?: boolean;
};

const isWebgl2Supported = (): boolean => {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
};

const noop = () => undefined;

const SphereViewer = ({ id, src, interactive }: PropsType) => {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [loading, setLoading] = useState(true);

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

  const fillStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <Wrapper $started={!!interactive}>
      <div
        id={`a-${id}`}
        ref={container}
        style={{ ...fillStyle, pointerEvents: interactive ? 'auto' : 'none' }}
      />
      {loading && <Loader />}
      {!loading && !interactive && <MediaButton text={t('item.start360Interior')} onClick={noop} />}
    </Wrapper>
  );
};

export default SphereViewer;
