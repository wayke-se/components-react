import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const InputAction = styled.div`
  ${(props) => props.theme.breakpoint.Sm} {
    display: flex;
    align-items: stretch;
  }
`;

export const InputActionInput = styled.div`
  ${(props) => props.theme.breakpoint.Sm} {
    flex: 1 1 auto;
  }
`;

export const InputActionBtn = styled.div`
  ${(props) => props.theme.breakpoint.LtSm} {
    margin-top: ${size(1)};

    > * {
      width: 100%;
    }
  }

  ${(props) => props.theme.breakpoint.Sm} {
    flex-shrink: 0;
    padding-left: ${size(2)};
  }
`;
