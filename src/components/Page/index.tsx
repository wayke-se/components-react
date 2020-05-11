import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Page = styled.div``;

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
      position: relative;
      padding: ${size(4)} 0;

      :before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 100vw;
        transform: translateX(-50%);
        background-color: ${(props) => props.theme.color.accent};
      }

      > * {
        position: relative;
      }
    `}

  ${({ large }: { large?: boolean }) =>
    large &&
    css`
      & + & {
        margin-top: ${size(8)};
      }
    `}
`;
