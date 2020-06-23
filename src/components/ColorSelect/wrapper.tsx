import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button/index';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${size(-1.5)};
`;

export const Item = styled.li`
  flex: 1 1 auto;
  width: 33.333%;
  max-width: 33.333%;
  padding: ${size(1.5)};
`;

export const Action = styled(ButtonReset)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font: inherit;

  &[disabled] {
    opacity: 0.4;
    cursor: default;
  }
`;

type ColorProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  active?: boolean;
  boxShadow?: boolean;
};

export const Color = styled.div<ColorProps>`
  position: relative;
  width: ${size(3.75)};
  height: ${size(3.75)};
  border-radius: 50%;
  color: ${(props) => props.theme.color.border};

  :before {
    content: '';
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    border: 2px solid;
    border-radius: 50%;
    display: none;
  }

  ${Action}:not([disabled]):hover & {
    :before {
      display: block;
    }
  }

  ${({ active }) =>
    active &&
    css`
      :before {
        display: block;
      }
    `}

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    `}
`;

export const Label = styled.div`
  margin-top: ${size(1.25)};
  font-size: 0.875rem;
`;
