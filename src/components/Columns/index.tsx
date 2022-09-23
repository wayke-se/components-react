import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

interface IColumn {
  grow?: boolean;
  noShrink?: boolean;
}

export const Column = styled.div<IColumn>`
  flex: 0 1 auto;

  ${({ grow }) =>
    grow &&
    css`
      flex-grow: 1;
    `}

  ${({ noShrink }) =>
    noShrink &&
    css`
      flex-shrink: 0;
    `}
`;

interface IColumns {
  $spacing?: number;
  flexWrap?: boolean;
  flexInline?: boolean;
  valign?: 'start' | 'center' | 'end';
  align?: 'start' | 'center' | 'end';
  clearLtSm?: boolean;
  clearLtMd?: boolean;
}

export const Columns = styled.div<IColumns>`
  display: flex;
  align-items: flex-start;

  ${({ valign }) =>
    valign === 'end'
      ? css`
          align-items: flex-end;
        `
      : valign === 'center'
      ? css`
          align-items: center;
        `
      : css`
          align-items: flex-start;
        `}

  ${({ align }) =>
    align === 'end'
      ? css`
          justify-content: flex-end;
        `
      : align === 'center'
      ? css`
          justify-content: center;
        `
      : css`
          justify-content: flex-start;
        `}

  ${({ $spacing }) =>
    $spacing &&
    css`
      margin: ${size($spacing / -2)};

      & > ${Column} {
        padding: ${size($spacing / 2)};
      }
    `}

  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: wrap;
    `}

  ${({ flexInline }) =>
    flexInline &&
    css`
      display: inline-flex;
    `}

  ${({ clearLtSm }) =>
    clearLtSm &&
    css`
      ${(props) => props.theme.breakpoint.LtSm} {
        display: block;
      }
    `}

  ${({ clearLtMd }) =>
    clearLtMd &&
    css`
      ${(props) => props.theme.breakpoint.LtMd} {
        display: block;
      }
    `}
`;
