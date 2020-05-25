import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const TableColumn = styled.div`
  line-height: 1.2;
`;

export const TableColumnRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin: ${size(-1)};
`;

export const TableColumnCell = styled.div`
  flex: 1 0 50%;
  padding: ${size(1)};
`;
