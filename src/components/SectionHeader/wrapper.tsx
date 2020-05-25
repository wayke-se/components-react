import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Heading = styled.div`
  flex: 1 1 auto;
`;

export const Action = styled.div`
  flex-shrink: 0;
  padding-left: ${size(2)};
`;
