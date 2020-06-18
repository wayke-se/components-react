import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const InputGroup = styled.div`
  ${(props) => props.theme.breakpoint.Sm} {
    display: flex;
    align-items: flex-start;
    margin: ${size(-0.5)};
  }
`;

export const InputGroupColumn = styled.div`
  ${(props) => props.theme.breakpoint.LtSm} {
    & + & {
      margin-top: ${size(1)};
    }
  }

  ${(props) => props.theme.breakpoint.Sm} {
    flex: 1 1 50%;
    padding: ${size(0.5)};
  }
`;
