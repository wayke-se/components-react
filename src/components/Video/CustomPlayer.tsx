import React from 'react';
import { Wrapper } from './wrapper';
import Video from './Video';

type PropsType = {
  url?: string;
  modal?: boolean;
  controls?: boolean;
  ratio?: string;
  isPreview?: boolean;
};

const CustomPlayer = ({ url, controls, modal, ratio = '56.25%', isPreview }: PropsType) => {
  return (
    <Wrapper ratio={ratio} isPreview={isPreview}>
      <Video
        key={url}
        modal={modal}
        preload="metadata"
        controls={controls}
        width="100%"
        height="100%"
        src={url}
      />
    </Wrapper>
  );
};
export default CustomPlayer;
