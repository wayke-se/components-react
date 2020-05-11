import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.distances.containerMaxWidth};
  margin: 0 auto;
  padding: 0 ${size(3)};

  ${(props) => props.theme.breakpoint.LtSm} {
    padding: 0 ${size(2)};
  }
`;
