import styled from 'styled-components';

export const Price = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--bold',
}))`
  font-size: 1.375rem;
`;

export const OldPrice = styled.div`
  color: ${(props) => props.theme.color.textDarkLighten};
  text-decoration: line-through;
`;
