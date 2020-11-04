import * as React from 'react';
import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { UtilityTextRight } from '../Utility/index';

export const ButtonReset = styled.button.attrs(() => ({
  type: 'button',
}))`
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  font-family: sans-serif;
  font-weight: 400;
  font-size: 1em;
  color: currentColor;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;

  :focus {
    outline: none;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;

type ButtonResetProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  fullWidth?: boolean;
  inputHeight?: boolean;
};

const ButtonBase = styled(ButtonReset)<ButtonResetProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${size(1.75)} ${size(6)};
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1.2;
  text-decoration: none;
  transform-origin: 50% 50%;
  transition: 200ms ease, transform 300ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.hoverOverlay};
    border-radius: 3px;
    opacity: 0;
    transition: opacity 150ms ease;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
    transform: scale(0.97);
  }

  &[disabled] {
    background-color: ${(props) => props.theme.color.disabledBg};
    border-color: ${(props) => props.theme.color.disabledBg};
    color: ${(props) => props.theme.color.disabledText};
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      display: flex;
      width: 100%;
    `}

  ${({ inputHeight }) =>
    inputHeight &&
    css`
      height: ${(props) => props.theme.distances.inputHeight};
    `}

  ${(props) => props.theme.breakpoint.LtSm} {
    padding: ${size(1.75)} ${size(2.5)};
    font-size: 0.875rem;
  }
`;

export const ButtonPrimary = styled(ButtonBase).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg wayke__font--bold',
}))``;

export const ButtonSecondary = styled(ButtonBase).attrs(() => ({
  className: 'wayke__theme wayke__color--secondary-bg wayke__font--bold',
}))`
  background-color: ${(props) => props.theme.color.accentDark};
  color: ${(props) => props.theme.color.textDark};
`;

export const ButtonContent = styled.div`
  position: relative;
  z-index: 1;

  & + & {
    margin-left: ${size(0.5)};
  }
`;

export const ButtonClear = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--bold',
}))`
  position: relative;
  font-size: 0.875rem;
  padding: ${size(1.5)};
  margin: ${size(-1.5)};
  text-align: left;
  transform-origin: 50% 50%;
  transition: transform 300ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

  ${UtilityTextRight} & {
    text-align: right;
  }

  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.color.accentDark};
    border-radius: 3px;
    opacity: 0;
    transition: opacity 200ms ease;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
    transform: scale(0.95);
  }
`;

type ButtonInlineProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  inline?: boolean;
  as?: string;
};

export const ButtonInline = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--regular',
}))<ButtonInlineProps>`
  display: inline-flex;
  vertical-align: baseline;
  text-align: left;
  text-decoration: underline;

  :not(:hover) {
    color: ${(props) => props.theme.color.textDark};
  }

  ${({ inline }) =>
    inline &&
    css`
      display: inline;
    `}
`;

export const ButtonInlineBold = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--bold',
}))`
  display: inline-flex;
  vertical-align: baseline;
  text-align: left;

  :hover {
    text-decoration: underline;
  }
`;

export const ButtonInlineLight = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--regular',
}))`
  display: inline-flex;
  vertical-align: baseline;
  text-align: left;
  text-decoration: none;

  :not(:hover) {
    color: ${(props) => props.theme.color.textDarkLighten};
  }
`;
