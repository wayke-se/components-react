import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button/index';

export const List = styled.ul`
  display: flex;
  aling-items: flex-start;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: ${size(-1)};
  font-size: 0.875rem;
`;

export const Item = styled.li`
  flex: 1 1 auto;
  width: 100%;
  max-width: 100%;
  padding: ${size(1)};

  ${(props) => props.theme.breakpoint.Sm} {
    width: 50%;
    max-width: 50%;
  }

  ${(props) => props.theme.breakpoint.Md} {
    width: 33.333%;
    max-width: 33.333%;
  }

  ${(props) => props.theme.breakpoint.Lg} {
    width: 25%;
    max-width: 25%;
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    display: flex;
    align-items: flex-start;
  }
`;

export const Label = styled.div`
  display: flex;
  align-items: center;

  ${(props) => props.theme.breakpoint.LtSm} {
    flex-shrink: 0;
  }
`;

export const Heading = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Info = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  position: relative;
  display: block;
  margin-left: ${size(0.5)};
  font: inherit;
  font-size: 1em;
  transform-origin: 50% 50%;
  transition: transform 300ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

  :before {
    content: '';
    position: absolute;
    top: ${size(-0.5)};
    bottom: ${size(-0.5)};
    left: ${size(-0.5)};
    right: ${size(-0.5)};
    background-color: ${(props) => props.theme.color.accentDark};
    border-radius: 50%;
    opacity: 0;
    transition: opacity 200ms ease;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  :hover {
    :before {
      opacity: 1;
    }
  }

  :active {
    transform: scale(0.95);
  }
`;

export const Value = styled.div`
  ${(props) => props.theme.breakpoint.LtSm} {
    flex: 1 1 auto;
    padding-left: ${size(1)};
    text-align: right;
  }
`;
