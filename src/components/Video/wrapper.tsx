import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9
`;

export const Iframe = styled.iframe.attrs(() => ({
  width: '100%',
  height: '100%',
  allowFullScreen: true,
  frameBorder: '0',
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
