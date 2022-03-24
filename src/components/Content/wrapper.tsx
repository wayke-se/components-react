import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  small?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  font-size: 1rem;
  line-height: 1.5;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${size(4)};
    margin-bottom: ${size(1)};

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }

    & + p,
    & + table {
      margin-top: ${size(1)};
    }
  }

  p {
    margin: ${size(2)} 0;

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }

  img {
    display: block;
    width: 100%;
  }

  ${({ small }) =>
    small &&
    css`
      font-size: 0.875rem;
    `}
`;
