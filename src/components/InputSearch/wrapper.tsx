import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  background-color: ${(props) => props.theme.color.accentDark};
  border-radius: 3px;
`;

export const Icon = styled.label`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: ${size(2)};
`;

export const Input = styled.input.attrs(() => ({
  type: 'search',
  className: 'wayke__theme wayke__font--regular',
}))`
  flex: 1 1 auto;
  display: block;
  width: 100%;
  height: ${size(6)};
  padding: 0 ${size(2)};
  background-color: transparent;
  font-size: 16px;
  border: none;
  border-radius: 0;
  box-shadow: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  :focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }

  &:-moz-placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }

  &::-moz-placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }

  &:-ms-input-placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }
`;
