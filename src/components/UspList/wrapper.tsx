import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const Item = styled.li`
  padding: ${size(0.5)};
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.accentDark};
  padding: ${size(1)} ${size(1.5)};
  border-radius: 3px;
  font-size: 0.875rem;
  overflow-wrap: break-word;
  hyphens: auto;
`;

export const ItemSection = styled.div`
  & + & {
    margin-left: ${size(0.75)};
  }
`;

export const Action = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  display: block;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${size(-0.5)};

  ${({ isSmall }: { isSmall?: boolean }) =>
    isSmall &&
    css`
      margin: ${size(-0.25)};

      ${Item} {
        padding: ${size(0.25)};
      }

      ${Box} {
        padding: ${size(0.5)} ${size(1)};
        font-size: 0.75rem;
      }

      ${ItemSection} {
        & + & {
          margin-left: ${size(0.5)};
        }
      }
    `}
`;
