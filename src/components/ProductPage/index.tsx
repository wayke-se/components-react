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
    flex: 1 0 auto;
    width: 33.333%;
    min-widht: 33.333%;
    padding-right: ${size(2)};
  }
`;

export const ProductPageMain = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    display: contents;
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 0 auto;
    width: 66.666%;
    min-widht: 66.666%;
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
    padding: ${size(5)} 0;
    border-top: 10px solid ${(props) => props.theme.color.accent};

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
    }
  }
`;
