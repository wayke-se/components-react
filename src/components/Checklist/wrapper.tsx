import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const List = styled.ul.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  list-style: none;
  padding: 0;
  margin: ${size(-1)} 0;
  font-size: 0.875rem;
  overflow: hidden;
`;

export const Item = styled.li`
  ${List} {
    padding-left: ${size(5)};
    margin: 0;
  }
`;

export const Action = styled(ButtonReset)`
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  font: inherit;
  padding: ${size(1)} 0;

  :before {
    content: '';
    position: absolute;
    left: 0;
    width: ${size(2)};
    height: ${size(2)};
    border-radius: 3px;
    background-color: ${(props) => props.theme.color.accentDark};
    margin-top: 2px; // Magic number
  }
`;

export const ActionIcon = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  position: absolute;
  top: ${size(1)};
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size(2)};
  height: ${size(2)};
  margin-top: 2px; // Magic number
  font-size: ${size(1.5)};
`;

export const ActionLabel = styled.div`
  padding-left: ${size(3)};
  transition: transform 150ms ease;

  ${Action}:hover & {
    transform: translateX(${size(0.5)});
  }
`;
