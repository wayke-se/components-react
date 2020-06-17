import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  display: flex;
  align-items: flex-start;

  & + & {
    margin-top: ${size(1)};
  }
`;

export const Label = styled.div`
  flex: 1 1 auto;
`;

export const Value = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  flex-shrink: 0;
  padding-left: ${size(2)};
`;
