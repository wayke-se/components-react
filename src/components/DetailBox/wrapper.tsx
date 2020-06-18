import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { H2 } from '../Heading';

export const Wrapper = styled.article`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

export const Main = styled.div`
  padding: ${size(2.5)};
`;

export const Heading = styled(H2).attrs(() => ({
  as: 'h1',
}))`
  margin-bottom: 0;
`;

export const Description = styled.div`
  margin-top: ${size(1)};
`;

export const Footer = styled.div`
  margin-top: ${size(1)};
  color: red;
`;

export const Foldout = styled.div`
  background-color: ${(props) => props.theme.color.accent};
  padding: ${size(2.5)};
`;
