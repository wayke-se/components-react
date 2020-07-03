import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button/index';

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  border-radius: 3px;
`;

export const Search = styled.div`
  flex: 1 1 auto;
  position: relative;
  display: flex;
  align-items: stretch;
  background-color: ${(props) => props.theme.color.accentDark};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`;

export const Action = styled.div`
  flex-shrink: 0;
`;

export const ActionBtn = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.theme.distances.inputHeight};
  height: ${(props) => props.theme.distances.inputHeight};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  font-size: 1rem;
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
  height: ${(props) => props.theme.distances.inputHeight};
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
