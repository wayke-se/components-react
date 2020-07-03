import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.article`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-origin: 50% 50%;
  transition: transform 150ms ease;

  :active {
    transform: scale(0.98);
  }
`;

export const Image = styled.div`
  flex-shrink: 0;
  position: relative;
  height: 0;
  padding-bottom: 66.666%;
  background-color: ${(props) => props.theme.color.accentDark};
  border-radius: 3px;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    opacity: 0;
    transition: opacity 200ms ease;
  }

  ${Wrapper}:hover & {
    :before {
      opacity: 1;
    }
  }
`;

export const Picture = styled.picture``;

export const Source = styled.source``;

export const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: auto;
  left: auto;
  border-radius: 3px;
`;

export const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin-top: ${size(2)};
`;

export const ContentBody = styled.div``;

export const ContentFooter = styled.div`
  margin-top: auto;
  padding-top: ${size(1)};
`;

export const Heading = styled.h1.attrs(() => ({
  className: 'wayke__theme wayke__font--bold',
}))`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
  margin: 0;
  font-size: 1rem;
`;

export const Link = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :focus {
    text-decoration: underline;
  }
`;

export const Description = styled.div`
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: ${size(0.25)};
`;

export const Usp = styled.div`
  margin-top: ${size(1)};
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const CurrentPrice = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text wayke__font--bold',
}))`
  font-size: 1rem;
  margin-right: ${size(1)};
`;

export const OldPrice = styled.div`
  text-decoration: line-through;
  color: ${(props) => props.theme.color.textDarkLighten};
  font-size: 0.875rem;
`;
