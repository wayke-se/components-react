import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

interface WrapperProps {
  $accentBg?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  --container-gutter: ${size(2)};
  --bg: ${(props) => props.theme.color.bg};

  ${(props) => props.theme.breakpoint.Sm} {
    --container-gutter: ${size(3)};
  }

  position: relative;

  ${({ $accentBg }) =>
    $accentBg &&
    css`
      --bg: ${(props) => props.theme.color.accent};
    `}
`;

export const Item = styled.li`
  flex: 1 0 auto;
  width: 100%;
  max-width: 100%;
  scroll-snap-align: start;
`;

interface ListProps {
  $columns?: number;
  $columnsSm?: number;
  $columnsMd?: number;
}

export const List = styled.ul<ListProps>`
  display: flex;
  align-items: stretch;
  list-style: none;
  padding: 0 var(--container-gutter);
  margin: 0;
  overflow: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: var(--container-gutter);
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ $columns }) =>
    $columns &&
    css`
      ${Item} {
        width: ${100 / $columns}%;
        max-width: ${100 / $columns}%;
      }
    `}

  ${({ $columnsSm }) =>
    $columnsSm &&
    css`
      ${(props) => props.theme.breakpoint.Sm} {
        ${Item} {
          width: ${100 / $columnsSm}%;
          max-width: ${100 / $columnsSm}%;
        }
      }
    `}

  ${({ $columnsMd }) =>
    $columnsMd &&
    css`
      ${(props) => props.theme.breakpoint.Md} {
        ${Item} {
          width: ${100 / $columnsMd}%;
          max-width: ${100 / $columnsMd}%;
        }
      }
    `}
`;

interface ListWrapperProps {
  $spacing?: number;
}

export const ListWrapper = styled.div<ListWrapperProps>`
  position: relative;
  overflow: hidden;
  margin: 0 calc(var(--container-gutter) * -1);

  ${(props) => props.theme.breakpoint.Md} {
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--container-gutter);
      background-color: var(--bg);
      z-index: 1;
    }

    &::before {
      left: 0;

      ${({ $spacing }) =>
        $spacing
          ? css`
              mask-image: linear-gradient(to right, #000 ${size($spacing)}, transparent);
            `
          : css`
              mask-image: ${(props) => props.theme.mask.gradient.toRight};
            `}
    }

    &::after {
      right: 0;

      ${({ $spacing }) =>
        $spacing
          ? css`
              mask-image: linear-gradient(to left, #000 ${size($spacing)}, transparent);
            `
          : css`
              mask-image: ${(props) => props.theme.mask.gradient.toLeft};
            `}
    }
  }

  ${({ $spacing }) =>
    $spacing &&
    css`
      ${List} {
        margin: 0 -${size($spacing / 2)};
      }

      ${Item} {
        padding: 0 ${size($spacing / 2)};
      }
    `}
`;

const NavBtn = styled.div`
  position: absolute;
  top: 50%;
  z-index: 2;

  ${(props) => props.theme.breakpoint.LtSm} {
    display: none;
  }
`;

export const PrevBtn = styled(NavBtn)`
  left: 0;
  transform: translate(-50%, -50%);
`;

export const NextBtn = styled(NavBtn)`
  right: 0;
  transform: translate(50%, -50%);
`;
