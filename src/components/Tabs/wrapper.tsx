import * as React from 'react';
import styled, { css } from 'styled-components';

import { ButtonReset } from '../Button';
import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  overflow: hidden;
  margin-top: ${size(-1)};
  margin-left: ${size(-1)};
  margin-right: ${size(-1)};

  ${(props) => props.theme.breakpoint.LtSm} {
    margin-left: ${size(-2)};
    margin-right: ${size(-2)};
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  font-size: 0;

  ${(props) => props.theme.breakpoint.LtSm} {
    padding-left: ${size(1)};
    padding-right: ${size(1)};
  }
`;

export const Item = styled.li`
  display: inline-block;
  vertical-align: bottom;
  font-size: 1rem;
`;

type ActionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  active?: boolean | string;
};

export const Action = styled(ButtonReset).attrs(() => ({
  role: 'tab',
  className: 'wayke__theme wayke__font--bold',
}))<ActionProps>`
  position: relative;
  display: block;
  padding: ${size(1)};
  color: ${(props) => props.theme.color.textDarkLighten};

  :hover {
    color: ${(props) => props.theme.color.textDark};
  }

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${size(1)};
    right: ${size(1)};
    height: 2px;
    background-color: ${(props) => props.theme.color.textDark};
    transform: scaleY(0);
    transition: transform 200ms ease;
    z-index: 1;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${(props) => props.theme.color.textDark};

      :after {
        transform: scaleY(1);
      }
    `}
`;
