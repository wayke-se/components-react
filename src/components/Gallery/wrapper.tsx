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

  ${(props) => props.theme.breakpoint.Md} {
    //background-color: ${(props) => props.theme.color.accent};
  }

  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > * {
    height: 100%;
  }

  .slick-slide > * {
    font-size: 0;

    > * {
      font-size: 1rem;
    }
  }
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

  :after {
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

export const Item = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  :focus {
    outline: none;
  }

  ${(props) => props.theme.breakpoint.LtMd} {
    //background-color: ${(props) => props.theme.color.textDark};
    transition: border-radius 150ms ease;
  }
`;

export const SliderWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .slick-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ${(props) => props.theme.breakpoint.LtMd} {
    overflow: hidden;

    .slick-list {
      overflow: visible;
      width: 95%;
    }

    .slick-slide {
      border-right: ${size(1)} solid ${(props) => props.theme.color.bg};
      //transform: scale(0.95);
      transform-origin: 0 50%;
      transition: transform 150ms ease;
    }

    .slick-slide.slick-active {
      transform: none;

      ${Item} {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
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
  active?: boolean;
};

export const QuickNavItem = styled.li.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))<QuickNavItemProps>`
  position: relative;

  & + & {
    margin-top: ${size(1)};
  }

  ${({ active }) =>
    active &&
    css`
      :before {
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

  :before {
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

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
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
`;

// Sphere Close Button

export const EnableNavigationButton = styled.div`
  position: absolute;
  bottom: ${size(2)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;
