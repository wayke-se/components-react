import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.blockquote`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;

  ${(props) => props.theme.breakpoint.Sm} {
    align-items: center;
  }
`;

export const Quote = styled.div`
  > * {
    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const Author = styled.footer`
  display: inline-flex;
  align-items: center;
  margin-top: ${size(3)};

  ${(props) => props.theme.breakpoint.Md} {
    margin-top: ${size(4)};
  }
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  padding-right: ${size(1.5)};
`;

export const Info = styled.div`
  flex: 1 1 auto;
  font-size: 0.875rem;
`;

export const Name = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))``;

export const Date = styled.div``;
