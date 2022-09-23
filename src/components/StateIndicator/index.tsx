import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

interface StateIndicatorProps {
  $tone?: 'success' | 'pending' | 'error';
}

export const StateIndicator = styled.div<StateIndicatorProps>`
  width: ${size(1)};
  height: ${size(1)};
  border-radius: 50%;

  ${({ $tone }) =>
    $tone === 'success'
      ? css`
          background-color: ${(props) => props.theme.color.ui.positive};
        `
      : $tone === 'pending'
      ? css`
          background-color: ${(props) => props.theme.color.ui.neutral};
        `
      : $tone === 'error'
      ? css`
          background-color: ${(props) => props.theme.color.ui.negative};
        `
      : css`
          background-color: ${(props) => props.theme.color.textDarkLighten};
        `}
`;
