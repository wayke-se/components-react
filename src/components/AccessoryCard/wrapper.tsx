import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${size(2)};
  height: 100%;
`;

const imageBaseStyling = css`
  flex-shrink: 0;
  aspect-ratio: 16 / 9;
  border-radius: 3px;
`;

export const Image = styled.img`
  ${imageBaseStyling};
  display: block;
  width: 100%;
  object-fit: cover;
`;

export const ImageaPlaceholder = styled.div`
  ${imageBaseStyling};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.textDarkLighten};
  font-size: 2rem;
  background-color: ${(props) => props.theme.color.accent};
`;

export const Body = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${size(1)};
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${size(2)};
`;

export const Title = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  font-size: 1.125rem;
`;

export const Branding = styled.img`
  display: block;
`;

export const Price = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))``;

export const Preamble = styled.div`
  --preamble-max-height: ${size(6)};
  --preamble-gradient-height: calc(var(--preamble-max-height) / 2);

  position: relative;
  max-height: var(--preamble-max-height);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;

  &::before {
    content: '';
    position: absolute;
    top: var(--preamble-max-height);
    left: 0;
    width: 100%;
    height: var(--preamble-gradient-height);
    transform: translateY(-100%); // Only visible if Preamble reaches max height
    color: ${(props) => props.theme.color.bg};
    mask-image: ${(props) => props.theme.mask.gradient.toTop};
    pointer-events: none;
  }
`;

export const ReadMoreBtn = styled(ButtonReset).attrs(() => ({
  className: 'wayke__theme wayke__font--bold wayke__color--primary-text',
}))`
  margin-top: auto;
  display: block;
  color: ${(props) => props.theme.color.link};
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;
