import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${size(1)};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 3px;

  & + & {
    margin-top: ${size(1)};
  }
`;

export const Logo = styled.div`
  flex-shrink: 0;
  padding-right: ${size(1)};
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
