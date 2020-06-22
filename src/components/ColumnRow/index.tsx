import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const ColumnRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ColumnRowItem = styled.div`
  flex: 1 1 auto;

  :last-child:not(:only-child) {
    flex: 0 0 auto;
  }

  & + & {
    padding-left: ${size(2)};
  }
`;
