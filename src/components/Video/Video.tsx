import React from 'react';
import styled from 'styled-components';

type VideoProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
> & {
  modal?: boolean;
};

const Video = styled.video<VideoProps>`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: ${({ modal }) => (modal ? 'contain' : 'cover')};
`;

export default Video;
