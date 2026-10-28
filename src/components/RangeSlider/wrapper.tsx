import * as SliderPrimitive from '@radix-ui/react-slider';
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

  &:first-child {
    flex: 1 1 auto;
  }

  &:last-child {
    flex-shrink: 0;
  }
`;

export const Root = styled(SliderPrimitive.Root)`
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  margin: 10px 0;
  touch-action: none;
  user-select: none;

  &[data-disabled] {
    opacity: 0.6;
  }
`;

export const Track = styled(SliderPrimitive.Track)`
  position: relative;
  flex-grow: 1;
  height: 4px;
  background-color: ${(props) => props.theme.color.accentDark};
`;

export const Range = styled(SliderPrimitive.Range).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg',
}))`
  position: absolute;
  height: 100%;
`;

export const Thumb = styled(SliderPrimitive.Thumb).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg',
}))`
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: grab;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  &:active {
    cursor: grabbing;
    transform: scale(1.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  [data-disabled] > & {
    cursor: default;
  }
`;
