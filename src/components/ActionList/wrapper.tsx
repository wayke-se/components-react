import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${size(-1)};
`;

export const Item = styled.li``;

export const Action = styled(ButtonReset)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${size(1)};
  transform-origin: 50% 50%;
  transition: transform 200ms ease;

  :active {
    transform: scale(0.95);
  }
`;

export const Icon = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  padding-right: ${size(1)};
`;

export const Label = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold wayke__color--primary-text',
}))`
  line-height: 1;
  transition: color 150ms ease;

  ${Action}:not(:hover) & {
    color: ${(props) => props.theme.color.textDark};
  }
`;
