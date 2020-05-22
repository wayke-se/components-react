import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  position: relative;
  width: ${size(9.5)};
  height: ${size(6)};
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const Logo = styled.img`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  padding: ${size(1)};
`;
