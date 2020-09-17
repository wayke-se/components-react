import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  tiny?: boolean;
  small?: boolean;
  large?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  & + & {
    margin-top: ${size(3)};
  }

  ${({ tiny }) =>
    tiny &&
    css`
      & + & {
        margin-top: ${size(1)};
      }
    `}

  ${({ small }) =>
    small &&
    css`
      & + & {
        margin-top: ${size(2)};
      }
    `}

  ${({ large }) =>
    large &&
    css`
      & + & {
        margin-top: ${size(6)};
      }
    `}
`;
