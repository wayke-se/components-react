import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { fadeIn, noTransform } from '../../layout/keyframes';
import { ButtonReset } from '../Button';
import { H1 } from '../Heading';

export const Wrapper = styled.div`
  position: relative;
  z-index: 80;
`;

export const UiBlock = styled.div.attrs(() => ({
  'aria-hidden': 'true',
  role: 'button',
}))`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(25, 25, 25, 0.4);
  animation: ${fadeIn} 200ms ease;
`;

export const PanelWrapper = styled.article.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: ${(props) => props.theme.color.bg};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  animation: ${noTransform} 200ms ease forwards;

  ${(props) => props.theme.breakpoint.Sm} {
    max-width: 450px;
    transform: translateX(100%);
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    top: auto;
    max-height: 100%;
    transform: translateY(100%);
  }
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  min-height: 45px;
  padding: ${size(3)};
  padding-bottom: 0;

  :after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: ${size(3)};
    background-image: linear-gradient(${(props) => props.theme.color.bg}, rgba(255, 255, 255, 0));
    z-index: 1;
  }
`;

export const Heading = styled.div`
  flex: 1 1 auto;

  ${H1} {
    font-size: 1.5rem;
  }
`;

export const Close = styled.div`
  flex-shrink: 0;
  margin: ${size(-2)};
  padding-left: ${size(3)};
`;

export const CloseBtn = styled(ButtonReset)`
  position: relative;
  display: block;
  padding: ${size(2)};
  transform-origin: 50% 50%;
  transition: transform 200ms ease;
  z-index: 2;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.accent};
    opacity: 0;
    transition: opacity 200ms ease;
    z-index: -1;
  }

  :active {
    transform: scale(0.9);
  }

  :hover {
    :before {
      opacity: 1;
    }
  }
`;

export const Body = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${size(3)};
`;

export const Footer = styled.footer`
  position: relative;
  flex-shrink: 0;
  padding: ${size(3)};
  border-top: 1px solid ${(props) => props.theme.color.border};
`;

export const FooterAction = styled.div`
  display: flex;
  align-items: center;
  margin: ${size(-0.5)};
`;

export const FooterActionItem = styled.div`
  flex: 1 1 50%;
  padding: ${size(0.5)};
`;
