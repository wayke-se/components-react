import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.ul`
  --price-box-gutter: ${size(2)};

  list-style: none;
  padding: var(--price-box-gutter);
  margin: 0;
  border: 1px solid ${(props) => props.theme.color.border};
`;

interface RowProps {
  $oldPrice?: boolean;
}

export const Row = styled.li<RowProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--price-box-gutter);

  & + & {
    margin-top: calc(var(--price-box-gutter) / 4);
  }

  ${({ $oldPrice }) =>
    $oldPrice &&
    css`
      --price-text-decoration: line-through;

      color: ${(props) => props.theme.color.textDarkLighten};
      font-size: 0.875rem;
    `}
`;

export const Label = styled.div``;

export const Price = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  text-decoration: var(--price-text-decoration);
`;
