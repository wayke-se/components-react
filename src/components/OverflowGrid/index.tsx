import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { Wrapper as Container } from '../Container/wrapper';

export const OverflowGrid = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    ${Container} & {
      margin-left: ${size(-3)};
      margin-right: ${size(-2)};
    }
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    ${Container} & {
      margin-left: ${size(-2)};
      margin-right: ${size(-1)};
    }
  }
`;

export const OverflowGridList = styled.ul`
  display: flex;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: ${size(-1)};

  ${(props) => props.theme.breakpoint.LtMd} {
    ${Container} & {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0 ${size(3)};

      :after {
        content: '';
        flex: 0 0 auto;
        height: 1px;
        width: ${size(2)};
      }
    }
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    ${Container} & {
      padding: 0 ${size(2)};

      :after {
        width: ${size(1)};
      }
    }
  }
`;

export const OverflowGridItem = styled.li`
  flex: 1 0 auto;
  width: calc(100% - ${size(2)});
  padding: ${size(1)};

  ${(props) => props.theme.breakpoint.Sm} {
    width: calc(50% - ${size(3)});
  }

  ${(props) => props.theme.breakpoint.Md} {
    width: 25%;
  }
`;
