import React from 'react';

import { MediaButtonWrapper } from './wrapper';
import { ButtonSecondary, ButtonContent } from '../Button';

interface MediaButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MediaButton = ({ text, onClick }: MediaButtonProps) => (
  <MediaButtonWrapper>
    <ButtonSecondary onClick={onClick} title={text}>
      <ButtonContent>{text}</ButtonContent>
    </ButtonSecondary>
  </MediaButtonWrapper>
);

export default MediaButton;
