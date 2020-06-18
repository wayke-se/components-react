import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.label.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  margin-bottom: ${size(0.5)};
  font-size: 0.875rem;
`;
