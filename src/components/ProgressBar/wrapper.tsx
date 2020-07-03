import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  text-align: center;
`;

export const Description = styled.div`
  margin-bottom: ${size(1.5)};
  font-size: 0.875rem;
`;

export const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.color.accentDark};
`;

export const BarActive = styled.div.attrs(() => ({
  role: 'progressbar',
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${(props) => props.theme.color.textDark};
`;
