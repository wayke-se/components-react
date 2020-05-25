import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div``;

type ExtendProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  extended?: boolean;
};

export const Extend = styled.div<ExtendProps>`
  position: relative;
  max-height: 175px;
  overflow: hidden;

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${size(6)};
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }

  ${({ extended }) =>
    extended &&
    css`
      max-height: none;

      :after {
        content: none;
      }
    `}
`;

export const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${size(2)};
`;
