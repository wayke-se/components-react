import styled from 'styled-components';
import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${size(2)};
  padding: ${size(2)};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 3px;
  font-size: 0.875rem;
  line-height: 1.3;
`;

export const Icon = styled.div`
  flex-shrink: 0;

  svg {
    display: block;
    width: auto;
    height: 3lh;
  }
`;

export const Body = styled.div`
  flex: 1 1 20ch;
  display: flex;
  flex-direction: column;
  gap: ${size(0.25)};

  p {
    margin: 0;
  }
`;

export const Heading = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))``;
