import styled from 'styled-components';
import { size } from '../../layout/helpers';

export const PdfListItem = styled.li.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))`
  flex: 0 0 50%;
  padding: ${size(1)};

  ${({ theme }) => theme.breakpoint.LtSm} {
    flex: 0 0 100%;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin: ${size(-1)};
`;

export const PdfLink = styled.a.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--bold',
}))`
  text-decoration: none;
  font-size: 0.875rem;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const PdfTitle = styled.div`
  color: ${(props) => props.theme.color.textDark};
`;
export const PdfSubtitle = styled.div`
  color: ${(props) => props.theme.color.textDarkLighten};
`;

export const PdfColumn = styled.div`
  flex: 0 0 auto;
  &:first-child {
    flex: 1 1 auto;
  }
`;

export const PdfListInner = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.color.border};
  padding: ${size(1.5)};
  display: flex;
  align-items: center;
  :hover {
    background-color: ${(props) => props.theme.color.hoverOverlay};
  }
`;
