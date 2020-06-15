import React from 'react';
import styled from 'styled-components';

import { ButtonSecondary, ButtonContent } from '../Button';

const MediaButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface MediaButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MediaButton = ({ text, onClick }: MediaButtonProps) => (
  <MediaButtonContainer>
    <ButtonSecondary onClick={onClick} title={text}>
      <ButtonContent>{text}</ButtonContent>
    </ButtonSecondary>
  </MediaButtonContainer>
);

export default MediaButton;
