import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';
import { Wrapper as Container } from '../Container/wrapper';

const quickNavWidth = 83; // 75px + 8px

export const Wrapper = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    ${Container} & {
      margin-left: ${size(-3)};
      margin-right: ${size(-3)};
    }
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    ${Container} & {
      margin-left: ${size(-2)};
      margin-right: ${size(-2)};
    }
  }

  ${(props) => props.theme.breakpoint.Md} {
    position: relative;
    padding-right: ${quickNavWidth}px;
  }
`;

export const Main = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 66.66666667%;
`;

export const Alt = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${quickNavWidth}px;
  padding-left: ${size(1)};

  ${(props) => props.theme.breakpoint.LtMd} {
    display: none;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${size(2.5)};
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    pointer-events: none;
  }
`;

/** The slides side by side; swiping and the arrows scroll it, each slide snaps in place. */
export const Track = styled.ul<{ $locked: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: ${({ $locked }) => ($locked ? 'hidden' : 'auto')};
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }
`;

export const Item = styled.li`
  position: relative;
  flex: 0 0 100%;
  height: 100%;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  // On small screens the next slide peeks in, as a hint that there are more.
  ${(props) => props.theme.breakpoint.LtMd} {
    flex-basis: 95%;
    border-right: ${size(1)} solid ${(props) => props.theme.color.bg};
  }
`;

export const Image = styled.img`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const ImageFull = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Arrow Nav

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${(props) => props.theme.breakpoint.LtSm} {
    display: none;
  }
`;

export const ArrowLeft = styled(Arrow)`
  left: ${size(2)};
`;

export const ArrowRight = styled(Arrow)`
  right: ${size(2)};
`;

// Quick Nav

export const QuickNav = styled.ul`
  position: relative;
  max-height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

type QuickNavItemProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  $active?: boolean;
};

export const QuickNavItem = styled.li.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))<QuickNavItemProps>`
  position: relative;

  & + & {
    margin-top: ${size(1)};
  }

  ${({ $active }) =>
    $active &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 3px solid currentColor;
        z-index: 2;
      }
    `}
`;

export const QuickNavBtn = styled(ButtonReset)`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 66.66666667%; // 3:2
  transform-origin: 50% 50%;
  transition: transform 300ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    opacity: 0;
    z-index: 1;
    transition: opacity 150ms ease;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const QuickNavImg = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Media Button

export const MediaButtonWrapper = styled.div`
  position: absolute;
  bottom: ${size(2)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  cursor: pointer;
`;

// Sphere Close Button

export const EnableNavigationButton = styled.div`
  position: absolute;
  bottom: ${size(2)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;
