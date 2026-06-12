import React from 'react';
import { ButtonContent, ButtonSecondary } from '../Button';
import { MediaButtonWrapper } from './wrapper';

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
