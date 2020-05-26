import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';
import { Wrapper as Container } from '../Container/wrapper';

export const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.accentDark};

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
`;

export const SliderWrapper = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 66.66666667%;

  .slick-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
`;

export const Arrow = styled(ButtonReset)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size(4)};
  height: ${size(4)};
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  color: ${(props) => props.theme.color.textLight};
  transform-origin: 50% 50%;
  transition: transform 200ms ease;

  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
    transform: translateY(-50%) scale(0.95);
  }

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
