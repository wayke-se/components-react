import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Page = styled.main`
  padding-top: ${size(4)};
`;

type PageSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  accent?: boolean;
  large?: boolean;
};

export const PageSection = styled.section<PageSectionProps>`
  & + & {
    margin-top: ${size(4)};
  }

  ${({ accent }: { accent?: boolean }) =>
    accent &&
    css`
      padding: ${size(4)} 0;
      background-color: ${(props) => props.theme.color.accent};
    `}

  ${({ large }: { large?: boolean }) =>
    large &&
    css`
      & + & {
        margin-top: ${size(8)};
      }
    `}
`;
