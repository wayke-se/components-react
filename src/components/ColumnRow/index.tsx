import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const ColumnRow = styled.div`
  display: flex;
  align-items: center;
`;

export const ColumnRowItem = styled.div`
  flex: 1 1 auto;

  :last-child {
    flex: 0 0 auto;
  }

  & + & {
    padding-left: ${size(2)};
  }
`;
