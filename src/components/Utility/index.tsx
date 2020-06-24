import styled from 'styled-components';

export const UtilityTextRight = styled.div`
  text-align: right;
`;

export const UtilityFontSizeSmall = styled.span`
  font-size: 0.875rem;
`;

export const UtilityTextPrimary = styled.span.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))``;

export const UtilityTextBold = styled.span.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))``;

export const UtilityTextPrimaryBold = styled.span.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--bold',
}))``;
