import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Label = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  flex: 1 1 auto;
`;

type ValueProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isHighlighted?: boolean;
};

export const Value = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold wayke__color--primary-text',
}))<ValueProps>`
  flex-shrink: 0;
  padding-left: ${size(2)};
  font-size: 1.125rem;

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      font-size: 1.375rem;
      color: ${(props) => props.theme.color.textDark} !important;
    `}
`;
