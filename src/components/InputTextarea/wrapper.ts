import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  background-color: ${(props) => props.theme.color.accent};
  border-radius: 3px;
`;

export const Textarea = styled.textarea.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  flex: 1 1 auto;
  display: block;
  width: 100%;
  min-height: calc(${(props) => props.theme.distances.inputHeight} * 2.5);
  padding: ${size(1.5)} ${size(2)};
  background-color: transparent;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.4;
  border: none;
  border-radius: 0;
  box-shadow: none;
  resize: vertical;
  -moz-appearance: none;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }
`;
