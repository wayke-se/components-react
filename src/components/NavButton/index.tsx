import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const NavButton = styled(ButtonReset)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size(4)};
  height: ${size(4)};
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.bg};
  color: ${(props) => props.theme.color.textDark};
  font-size: 0.75rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transition: transform 200ms ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  &:enabled {
    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;
