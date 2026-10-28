import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Suggestions = styled.ul.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin: ${size(0.5)} 0 0;
  padding: ${size(0.5)} 0;
  list-style: none;
  background-color: ${(props) => props.theme.color.bg};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const Suggestion = styled.li<{ $active: boolean }>`
  padding: ${size(1)} ${size(2)};
  cursor: pointer;
  background-color: ${(props) => (props.$active ? props.theme.color.hoverOverlay : 'transparent')};

  &:hover {
    background-color: ${(props) => props.theme.color.hoverOverlay};
  }
`;
