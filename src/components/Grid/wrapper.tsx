import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div``;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${size(-2)} ${size(-1)};
`;

export const Item = styled.li`
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  padding: ${size(2)} ${size(1)};

  ${(props) => props.theme.breakpoint.Sm} {
    width: 50%;
    max-width: 50%;
  }

  ${(props) => props.theme.breakpoint.Md} {
    width: 33.333%;
    max-width: 33.333%;
  }
`;
