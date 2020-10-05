import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Repeat = styled.div`
  & + & {
    margin-top: ${size(3)};
  }
`;

export const RepeatTiny = styled.div`
  & + & {
    margin-top: ${size(1)};
  }
`;

export const RepeatSmall = styled.div`
  & + & {
    margin-top: ${size(2)};
  }
`;
