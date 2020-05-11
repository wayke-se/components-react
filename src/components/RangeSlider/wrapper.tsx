import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const RangeSpan = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${size(1)};
  user-select: none;
`;

export const RangeSpanItem = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.color.textDarkLighten};

  :first-child {
    flex: 1 1 auto;
  }

  :last-child {
    flex-shrink: 0;
  }
`;

export const Slider = styled.div`
  padding: 10px 12px;
`;

export const Bar = styled.div`
  position: relative;
  height: 4px;

  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -12px;
    right: -12px;
    background-color: ${(props) => props.theme.color.accentDark};
  }
`;

export const Track = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg',
}))`
  position: absolute;
  top: 0;
  height: 4px;
  margin-left: -12px;
  margin-right: -12px;
`;

export const Handle = styled.div.attrs(() => ({
  role: 'slider',
  className: 'wayke__theme wayke__color--primary-bg',
}))`
  position: absolute;
  top: 50%;
  transform-origin: 50% 50%;
  display: block;
  width: 24px;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;
  border-radius: 50%;
  cursor: move;
  cursor: ew-resize;
  cursor: -webkit-grab;
  cursor: grab;
  transition: transform 150ms ease;

  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 150ms ease;
  }

  :active {
    transform: scale(1.3);

    :before {
      opacity: 1;
    }
  }
`;
