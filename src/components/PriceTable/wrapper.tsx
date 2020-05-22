import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  display: flex;
  align-items: flex-end;
  line-height: 1;

  & + & {
    margin-top: ${size(0.5)};
  }
`;

export const Label = styled.div`
  flex: 1 1 auto;
`;

export const Value = styled.div`
  flex-shrink: 0;
`;
