import * as React from 'react';
import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Label = styled.label.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  position: relative;
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  line-height: 1.2;
  cursor: pointer;

  :before {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: ${size(2.5)};
    height: ${size(2.5)};
    margin-right: ${size(1)};
    background-color: ${(props) => props.theme.color.accent};
    color: currentColor;
    border: none;
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.07);
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const Wrapper = styled((props) => <div {...props} />).attrs(({ type, checked }) => ({
  role: type || 'checkbox',
  'aria-checked': checked,
}))`
  ${({ error }) =>
    error &&
    css`
      ${Label} {
        color: ${(props) => props.theme.color.ui.negative};

        :before {
          background-color: ${(props) => props.theme.color.ui.negativeLight};
        }
      }
    `}
`;

export const Input = styled((props) => (
  <input {...props} className={`${props.checked ? 'checked' : undefined} ${props.className}`} />
)).attrs(({ type, checked }) => ({
  checked,
  type: type || 'checkbox',
}))`
  position: fixed;
  left: -9999px;
  opacity: 0;

  &[disabled] {
    & + ${Label} {
      color: ${(props) => props.theme.color.disabledText};

      &:before {
        background-color: ${(props) => props.theme.color.disabledBg};
        cursor: not-allowed;
      }
    }
  }

  &:checked,
  &.checked {
    & + ${Label} {
      :before {
        content: '✓';
      }
    }
  }
`;

export const LabelText = styled.div`
  color: ${(props) => props.theme.color.textDark};
`;
