import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { Wrapper as Container } from '../Container/wrapper';

export const ProductPage = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.breakpoint.Md} {
    flex-direction: row;
  }
`;

export const ProductPageAside = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    display: contents;
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex-shrink: 0;
    width: calc(375px + ${size(2)});
    padding-right: ${size(2)};
  }
`;

export const ProductPageMain = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    display: contents;
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 1 auto;
    padding-left: ${size(2)};
  }
`;

type ProductPageAsideSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  mobileOrder?: number;
};

export const ProductPageAsideSection = styled.div<ProductPageAsideSectionProps>`
  ${(props) => props.theme.breakpoint.LtMd} {
    order: ${(props) => props.mobileOrder};

    & + & {
      margin-top: ${size(2)};
    }

    :last-child {
      margin-bottom: ${size(4)};
    }

    ${ProductPageMain} & {
      margin-top: ${size(2)};
    }
  }

  ${(props) => props.theme.breakpoint.Md} {
    & + & {
      margin-top: ${size(4)};
    }

    ${ProductPageMain} & {
      margin-bottom: ${size(8)};
    }
  }
`;

export const ProductPageMainSection = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    order: 99;
    padding: ${size(4)} 0;
    border-top: ${size(1)} solid ${(props) => props.theme.color.accent};

    ${Container} & {
      margin-left: ${size(-2)};
      margin-right: ${size(-2)};
      padding-left: ${size(2)};
      padding-right: ${size(2)};
    }
  }

  ${(props) => props.theme.breakpoint.Md} {
    & + & {
      margin-top: ${size(8)};
      padding-top: ${size(8)};
      border-top: 1px solid ${(props) => props.theme.color.border};
    }
  }
`;

export const ProductPageContentLimit = styled.div`
  max-width: 420px;
`;
