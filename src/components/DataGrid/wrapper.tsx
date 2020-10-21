import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button/index';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;
  border-top: 1px solid ${(props) => props.theme.color.border};
  border-bottom: 1px solid ${(props) => props.theme.color.border};
`;

export const Item = styled.li`
  display: flex;
  padding: ${size(2)} 0;

  & + & {
    border-top: 1px solid ${(props) => props.theme.color.border};
  }
`;

export const Label = styled.div`
  flex: 1 1 auto;
  display: flex;
  min-width: 0;
`;

export const Heading = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HeadingAction = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__font--bold wayke__color--primary-text',
}))`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;

  :hover {
    text-decoration: underline;
  }
`;

export const Value = styled.div`
  flex-shrink: 0;
  padding-left: ${size(2)};
`;
