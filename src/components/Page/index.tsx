import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Page = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding-top: ${size(4)};
`;

type PageSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  accent?: boolean;
  large?: boolean;
  fillSpace?: boolean;
};

export const PageSection = styled.section<PageSectionProps>`
  margin-bottom: ${size(4)};

  ${({ accent }: { accent?: boolean }) =>
    accent &&
    css`
      padding: ${size(4)} 0;
      background-color: ${(props) => props.theme.color.accent};
      margin-bottom: 0;
    `}

  ${({ large }: { large?: boolean }) =>
    large &&
    css`
      margin-bottom: ${size(8)};
    `}

  ${({ accent, large }) =>
    accent &&
    large &&
    css`
      padding: ${size(8)} 0;
      margin-bottom: 0;
    `}

  ${({ fillSpace }: { fillSpace?: boolean }) =>
    fillSpace &&
    css`
      flex: 1 1 auto;
    `}
`;
