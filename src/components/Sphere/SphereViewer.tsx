import React, { lazy, useState, useEffect } from 'react';

import { Wrapper } from './wrapper';
import Loader from '../Loader';

const ReactPannellum = lazy(() => import('react-pannellum'));

const config = {
  type: 'equirectangular',
  autoRotate: -2,
  autoLoad: true,
  uiText: {
    bylineLabel: 'by %s',
    noPanoramaError: 'No panorama image was specified.',
    fileAccessError: 'The file %s could not be accessed.',
    malformedURLError: 'There is something wrong with the panorama URL.',
    iOS8WebGLError:
      "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
    genericWebGLError:
      'Your browser does not have the necessary WebGL support to display this panorama.',
    textureSizeError:
      "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
    unknownError: 'Unknown error. Check developer console.',
    loadButtonLabel: 'Starta 360° interiört',
    loadingLabel: 'Laddar...',
  },
  preview: '/images/placeholders/placeholder_product_card.jpg',
  compass: true,
  showZoomCtrl: true,
  keyboardZoom: false,
  mouseZoom: false,
  hfov: 180,
};

const style = {
  height: 0,
  width: '100%',
  paddingBottom: '66.666%',
  touchAction: 'manipulation',
};
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

  const c = {
    ...config,
    preview,
    autoLoad,
  };

  return (
    <Wrapper>
      <React.Suspense fallback={<Loader />}>
        <ReactPannellum
          id={`a-${id}-${number}`}
          sceneId={src}
          imageSource={src}
          config={c}
          style={style}
        />
      </React.Suspense>
    </Wrapper>
  );
};

export default SphereViewer;
