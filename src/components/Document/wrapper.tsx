import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonInlineBold } from '../Button/index';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${size(-1)};
`;

export const Item = styled.li`
  flex: 1 1 auto;
  padding: ${size(1)};
  width: 100%;
  max-width: 100%;

  ${(props) => props.theme.breakpoint.Sm} {
    width: 50%;
    max-width: 50%;
  }
`;

export const Doc = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${size(2)};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 3px;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.accent};
    border-radius: 3px;
    opacity: 0;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  > * {
    z-index: 1;
  }
`;

export const Icon = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
  padding-right: ${size(2)};
`;

export const Info = styled.div`
  flex: 1 1 auto;
`;

export const Title = styled.div`
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const SubTitle = styled.div`
  margin-top: ${size(0.25)};
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.textDarkLighten};
  line-height: 1.4;
`;

export const Action = styled.div`
  flex-shrink: 0;
  padding-left: ${size(2)};
  font-size: 0.75rem;

  ${ButtonInlineBold} {
    position: static;
    display: block;

    :after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
`;
