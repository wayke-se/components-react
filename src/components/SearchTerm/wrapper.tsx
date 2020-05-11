import styled from 'styled-components';

export const Wrapper = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  font-size: 2.25rem;

  :before,
  :after {
    content: '"';
  }
`;
