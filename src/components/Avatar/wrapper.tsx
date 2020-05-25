import styled from 'styled-components';

import { size } from '../../layout/helpers';

interface Wrapper {
  image: string;
}

export const Wrapper = styled.div.attrs(() => ({
  role: 'image',
}))<Wrapper>`
  display: block;
  width: ${size(5)};
  height: ${size(5)};
  border-radius: 50%;
  background-image: ${(props): string => `url(${props.image})`};
`;
