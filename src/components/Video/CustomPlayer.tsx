import React, { useRef } from 'react';
import { Wrapper } from './wrapper';
import useHasBeenVisible from '../../hooks/useHasBeenVisible';
import Video from './Video';

type PropsType = {
  url?: string;
  modal?: boolean;
  controls?: boolean;
  ratio?: string;
  isPreview?: boolean;
};

const CustomPlayer = ({ url, controls, modal, ratio = '56.25%', isPreview }: PropsType) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const isVisible = useHasBeenVisible(ref);

  return (
    <Wrapper ratio={ratio} isPreview={isPreview}>
      <Video
        key={url}
        ref={ref}
        modal={modal}
        controls={controls}
        preload={isVisible ? 'metadata' : 'none'}
        width="100%"
        height="100%"
        src={url}
      />
    </Wrapper>
  );
};
export default CustomPlayer;
