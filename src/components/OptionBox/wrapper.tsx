import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${size(1)};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 3px;

  & + & {
    margin-top: ${size(1)};
  }
`;

export const Logo = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-right: ${size(1)};
  width: ${size(9.5)};
  height: ${size(6)};
`;

export const LogoImg = styled.img`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: auto;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
`;

export const Content = styled.div`
  flex: 1 1 auto;
  text-align: right;
  line-height: 1.4;
`;

export const OptionBoxHeading = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  font-size: 1rem;
`;

export const OptionBoxContent = styled.div`
  margin-top: ${size(0.5)};
  font-size: 0.875rem;

  p {
    margin: 0;
  }
`;
