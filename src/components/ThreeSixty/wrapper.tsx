import styled from 'styled-components';

import { size } from '../../layout/helpers';

// As wide as the image, so the badge and the slider sit on it.
export const Figure = styled.figure`
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  cursor: grab;
  user-select: none;
  // Vertical scrolling stays with the page; horizontal moves rotate the car.
  touch-action: pan-y;

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }
`;

export const Badge = styled.span.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg wayke__font--bold',
}))`
  position: absolute;
  top: ${size(2)};
  left: ${size(2)};
  // Above the lightbox image, which has z-index 1.
  z-index: 2;
  padding: ${size(0.5)} ${size(1)};
  border-radius: 3px;
  font-size: 0.75rem;
  pointer-events: none;
`;

export const SliderBar = styled.div`
  position: absolute;
  left: ${size(1)};
  right: ${size(1)};
  bottom: ${size(1)};
  // Above the lightbox image, which has z-index 1.
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${size(2)};
  padding: 0 ${size(2)};
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: default;

  // The slider takes the room the value text leaves.
  > :first-child {
    flex: 1 1 auto;
  }
`;

export const SliderValue = styled.span`
  flex-shrink: 0;
  font-size: 0.875rem;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;
