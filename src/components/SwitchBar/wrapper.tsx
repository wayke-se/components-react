import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const Wrapper = styled.div`
  padding: ${size(1.5)} ${size(2)};
  background-color: ${(props) => props.theme.color.accentDark};
  border-radius: 3px;
  font-size: 0.875rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  font-size: 0.875rem;
  margin-top: ${size(1)};
`;

export const Info = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
`;

export const Action = styled.div`
  flex-shrink: 0;
  padding-left: ${size(1.5)};
  font-size: 0.875rem;
`;

export const InfoContent = styled.div`
  & + & {
    margin-left: ${size(0.75)};
  }
`;

export const InfoBtn = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  position: relative;
  display: block;

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

export const Title = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  font-size: 1rem;
`;
