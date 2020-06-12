import React from 'react';
import styled from 'styled-components';

const MediaButtonContainer = styled.button`
  display: inline-block;
  vertical-align: middle;
  background-color: hsla(0, 0%, 100%, 0);
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  line-height: 1.2;
  color: currentColor;
  border-color: hsla(0, 0%, 100%, 0);
  border-radius: 0;
  font-family: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MediaButtonShell = styled.div`
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-style: normal;
  font-stretch: normal;
  font-family: Styrene A Medium, sans-serif;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: nowrap;
  padding: 12px 24px;
  border-radius: 999px;
  background-color: #424240;
  color: #fff;
  font-size: 0;
`;

const MediaButtonSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

interface MediaButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MediaButton = ({ text, onClick }: MediaButtonProps) => (
  <MediaButtonContainer onClick={onClick}>
    <MediaButtonShell>
      <MediaButtonSpan>{text}</MediaButtonSpan>
    </MediaButtonShell>
  </MediaButtonContainer>
);

export default MediaButton;
