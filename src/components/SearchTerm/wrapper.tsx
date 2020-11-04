import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button/index';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Query = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  font-size: 2.25rem;
  min-width: 0;
  overflow-wrap: break-word;
  hyphens: auto;

  :before,
  :after {
    content: '"';
  }
`;

export const Clear = styled(ButtonReset)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size(2)};
  height: ${size(2)};
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.accentDark};
  margin-left: ${size(1)};
  font-size: ${size(1)};
  transform-origin: 50% 50%;
  transition: transform 150ms ease;

  :before {
    content: '';
    position: absolute;
    top: ${size(-1)};
    bottom: ${size(-1)};
    left: ${size(-1)};
    right: ${size(-1)};
    border-radius: 50%;
  }

  :after {
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
    :after {
      opacity: 1;
    }
  }

  :active {
    transform: scale(0.95);
  }
`;
