import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const Wrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div``;

export const Info = styled.div`
  margin-left: ${size(1)};
`;

export const InfoBtn = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  position: relative;
  display: block;
  font: inherit;
  font-size: 1em;
  transform-origin: 50% 50%;
  transition: transform 300ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

  :before {
    content: '';
    position: absolute;
    top: ${size(-0.5)};
    bottom: ${size(-0.5)};
    left: ${size(-0.5)};
    right: ${size(-0.5)};
    background-color: ${(props) => props.theme.color.accentDark};
    border-radius: 50%;
    opacity: 0;
    transition: opacity 200ms ease;
  }

  > * {
    position: relative;
    z-index: 1;
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

export const Extend = styled.div`
  padding-top: ${size(1)};
  margin-top: ${size(1)};
  border-top: 1px solid ${(props) => props.theme.color.border};
  font-size: 0.875em;
`;
