import styled from 'styled-components';

import { size } from '../../layout/helpers';

const iconSize = '0.875rem';
const selectPadding = size(2);

export const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.accent};
  border-radius: 3px;
`;

export const Select = styled.select.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  position: relative;
  display: block;
  width: 100%;
  height: ${(props) => props.theme.distances.inputHeight};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-indent: 0.01px;
  border: 0;
  padding: 0 ${selectPadding};
  padding-right: calc(${iconSize} + ${selectPadding});
  background-color: transparent;
  color: ${(props) => props.theme.color.textDark};
  border-radius: 0;
  font-size: 16px;
  cursor: pointer;
  z-index: 1;

  :focus {
    outline: none;
  }

  ::-ms-expand {
    display: none;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;

export const Option = styled.option`
  color: ${(props) => props.theme.color.textDark};
`;

export const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: ${selectPadding};
  transform: translateY(-50%);
  font-size: ${iconSize};
`;
