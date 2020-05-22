import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  position: relative;
  font-size: 0.875rem;

  & + & {
    margin-top: ${size(0.5)};
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 4px; // Magic number
  font-size: 0.875em;
  color: ${(props) => props.theme.color.ui.positive};
`;

export const Label = styled.div`
  padding-left: calc(1em + ${size(1)});
`;
