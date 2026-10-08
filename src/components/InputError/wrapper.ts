import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  margin-top: ${size(0.5)};
  font-size: 0.875rem;
  color: ${(props) => props.theme.color.ui.negative};
`;
