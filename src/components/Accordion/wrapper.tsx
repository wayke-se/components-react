import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${size(-1)} 0;
  font-size: 1rem;
`;

export const Header = styled(ButtonReset)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${size(3)} 0;
  text-align: left;
  font: inherit;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

export const Heading = styled.div`
  line-height: 1;
`;

export const Indicator = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-bg',
}))`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${size(0.375)};
  margin-left: ${size(0.5)};
  min-width: 1em;
  height: 1em;
  border-radius: 999px;
  z-index: 1;
`;

export const IndicatorValue = styled.div`
  font-family: sans-serif; // Default font to guarantee visibility
  font-size: 0.75rem;
  font-weight: bold;
`;

export const Icon = styled.div`
  position: relative;
  flex-shrink: 0;
  padding-left: ${size(1)};
  transition: color 150ms ease;

  :before {
    content: '';
    position: absolute;
    top: ${size(-1)};
    bottom: ${size(-1)};
    left: 0;
    right: ${size(-1)};
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.accent};
    z-index: -1;
    opacity: 0;
    transition: opacity 200ms ease;
  }

  ${Header}:hover & {
    :before {
      opacity: 1;
    }
  }
`;

export const Body = styled.div`
  display: none;
  padding-bottom: ${size(3)};
`;

type ItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  isOpen?: boolean;
};

export const Item = styled.li<ItemProps>`
  & + & {
    border-top: 1px solid ${(props) => props.theme.color.border};
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      ${Body} {
        display: block;
      }

      ${Icon} {
        svg {
          transform: rotate(180deg);
        }
      }
    `}
`;
