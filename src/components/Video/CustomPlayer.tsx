import React, { useRef } from 'react';
import { Wrapper } from './wrapper';
import styled from 'styled-components';
import useHasBeenVisible from '../../hooks/useHasBeenVisible';

type PropsType = {
  url?: string;
  modal?: boolean;
  controls?: boolean;
  ratio?: string;
};

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: ${({ modal }) => (modal ? 'contain' : 'cover')};
`;

const CustomPlayer = ({ url, controls, modal, ratio = '56.25%' }: PropsType) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const isVisible = useHasBeenVisible(ref);

  return (
    <Wrapper ratio={ratio}>
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
