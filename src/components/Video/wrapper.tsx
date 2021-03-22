import styled from 'styled-components';

type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  ratio?: string;
};

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${(props): string => (props.ratio ? props.ratio : '56.25%')};
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
