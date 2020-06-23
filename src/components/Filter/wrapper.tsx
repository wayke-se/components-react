import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button/index';

export const List = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${size(-0.5)};
`;

export const Item = styled.li`
  padding: ${size(0.5)};
`;

export const Action = styled(ButtonReset)`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${size(1.5)} ${size(3)};
  background-color: ${(props) => props.theme.color.accentDark};
  border-radius: 3px;
  font-size: 0.875rem;
  line-height: 1;
  transform-origin: 50% 50%;
  transition: transform 150ms ease;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.hoverOverlay};
    border-radius: 3px;
    opacity: 0;
    transition: opacity 150ms ease;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
    transform: scale(0.95);
  }
`;

export const Label = styled.div`
  z-index: 1;
`;

export const Indicator = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${size(0.375)};
  margin-left: ${size(0.5)};
  background-color: currentColor;
  min-width: 1em;
  height: 1em;
  border-radius: 999px;
  z-index: 1;
`;

export const IndicatorValue = styled.div`
  font-family: sans-serif; // Default font to guarantee visibility
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  mix-blend-mode: difference;
`;
