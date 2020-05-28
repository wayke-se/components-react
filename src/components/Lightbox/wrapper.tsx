import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${size(3)};
  z-index: 90;
  overflow: auto;

  ${(props) => props.theme.breakpoint.LtSm} {
    padding: ${size(2)};
  }
`;

export const UiBlock = styled.div.attrs(() => ({
  role: 'button',
}))`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
`;

export const Img = styled.img`
  position: relative;
  display: block;
  max-width: 100%;
  max-height: calc(100vh - ${size(6)});
  margin: 0 auto;
  z-index: 1;

  & + & {
    margin-top: ${size(1)};
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    max-height: calc(100vh - ${size(4)});
  }
`;

export const CloseBtn = styled(ButtonReset)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: ${size(2)};
  right: ${size(2)};
  width: ${size(5)};
  height: ${size(5)};
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.bg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform-origin: 50% 50%;
  transition: 200ms ease, transform 300ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.hoverOverlay};
    border-radius: 50%;
    opacity: 0;
    transition: opacity 150ms ease;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
    transform: scale(0.97);
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    top: ${size(1)};
    right: ${size(1)};
  }
`;
