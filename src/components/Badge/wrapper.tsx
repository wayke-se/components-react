import styled from 'styled-components';

import { size } from '../../layout/helpers';
import theme from '../../layout/theme';

const getBg = (severity: string | undefined): string => {
  let bg = theme.color.textDark;

  if (severity === 'positive') {
    bg = theme.color.ui.positive;
  } else if (severity === 'negative') {
    bg = theme.color.ui.negative;
  }

  return bg;
};

interface Wrapper {
  severity?: string;
}

export const Wrapper = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))<Wrapper>`
  display: inline-block;
  background-color: ${(props): string => getBg(props.severity)};
  padding: ${size(0.75)} ${size(1.5)};
  color: ${(props) => props.theme.color.textLight};
  border-radius: 3px;
  font-size: 0.75rem;
  line-height: 1.2;
`;
