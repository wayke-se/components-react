import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div``;

export const Header = styled.header`
  margin-bottom: ${size(4)};
`;

export const Body = styled.div``;

export const Footer = styled.footer`
  margin-top: ${size(8)};
  text-align: center;
`;

export const FooterProgress = styled.div`
  max-width: 175px;
  margin: 0 auto;
`;

export const FooterAction = styled.div`
  margin-top: ${size(3)};
`;

export const ResultCount = styled.div`
  color: ${(props) => props.theme.color.textDarkLighten};
  font-size: 0.875rem;
`;
