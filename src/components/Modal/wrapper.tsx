import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { fadeIn, noTransform } from '../../layout/keyframes';

import { ButtonReset } from '../Button';
import { H1 } from '../Heading';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  white-space: normal;
  text-align: left;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.breakpoint.Sm} {
    padding: ${size(2)};
  }
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
  background-color: rgba(0, 0, 0, 0.35);
  z-index: -1;

  ${(props) => props.theme.breakpoint.LtMd} {
    animation: ${fadeIn} 300ms ease forwards;
  }

  ${(props) => props.theme.breakpoint.Md} {
    animation: ${fadeIn} 400ms ease forwards;
  }
`;

export const Dialog = styled.article.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bg};
  z-index: 1;
  width: 100%;
  max-width: 680px;
  max-height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  ${(props) => props.theme.breakpoint.LtSm} {
    align-self: flex-end;
    transform: translateY(100%);
    animation: ${noTransform} 300ms ease forwards;
  }

  ${(props) => props.theme.breakpoint.Sm} {
    transform: translateY(${size(2)});
    animation: ${fadeIn} 400ms ease, ${noTransform} 400ms ease forwards;
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: ${size(3)};
  padding-bottom: 0;
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
  display: block;
  padding: ${size(2)};
`;

export const Body = styled.div`
  padding: ${size(3)};
`;

export const Image = styled.img`
  display: block;
  width: calc(100% + ${size(6)});
  margin-left: ${size(-3)};
  margin-bottom: ${size(3)};
`;

export const ModalFoldout = styled.div`
  background-color: ${(props) => props.theme.color.accent};
  margin: ${size(-3)};
  margin-top: ${size(3)};
  padding: ${size(3)};
`;

export const ModalFoldoutBody = styled.div``;
