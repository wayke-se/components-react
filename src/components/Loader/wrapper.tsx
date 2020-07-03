import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { rotate } from '../../layout/keyframes';

export const Spinner = styled.div`
  display: block;
  margin: 0 auto;
  width: ${size(4)};
  height: ${size(4)};
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: ${rotate} 600ms linear infinite;
`;

type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  inline?: boolean;
  center?: boolean;
};

export const Wrapper = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
  role: 'status',
}))<WrapperProps>`
  ${({ inline }) =>
    inline &&
    css`
      display: inline-block;
      vertical-align: middle;
      color: currentColor !important;

      ${Spinner} {
        width: 1em;
        height: 1em;
      }
    `}

  ${({ center }) =>
    center &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
`;
