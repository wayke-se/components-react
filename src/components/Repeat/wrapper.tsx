import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  small?: boolean;
  large?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  & + & {
    margin-top: ${size(3)};
  }

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
