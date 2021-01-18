import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const TableList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid ${(props) => props.theme.color.border};
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  font-size: 0.875rem;
`;

export const TableListItem = styled.li`
  display: flex;
  align-items: center;
  padding: ${size(1)} 0;

  & + & {
    border-top: 1px solid ${(props) => props.theme.color.border};
  }
`;

export const TableListKey = styled.div`
  flex: 1 1 auto;
`;

export const TableListValue = styled.div`
  flex-shrink: 0;
  padding-left: ${size(1)};
`;

export const TableListBooleanPos = styled.div`
  color: ${(props) => props.theme.color.ui.positive};
`;

export const TableListBooleanNeg = styled.div`
  color: ${(props) => props.theme.color.ui.negative};
`;
