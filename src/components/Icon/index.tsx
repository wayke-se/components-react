import * as React from 'react';
import styled, { css } from 'styled-components';

type SharedIconProps = {
  block?: boolean;
};

type IconProps = React.SVGProps<SVGSVGElement> & SharedIconProps;

const Icon = styled.svg.attrs(() => ({
  xmlns: 'http://www.w3.org/2000/svg',
}))<IconProps>`
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
  fill: currentColor;

  ${({ block }) =>
    block &&
    css`
      display: block;
    `}
`;

type IconInfoProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  SharedIconProps;

export const IconInfo = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 24 24" block={block}>
    <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm0 2c5.5234 0 10 4.4766 10 10s-4.4766 10-10 10S2 17.5234 2 12 6.4766 2 12 2zm0 3.8125c-.1836 0-.336-.004-.5.0313-.164.0351-.3164.125-.4375.2187-.121.0938-.211.2227-.2813.375s-.0937.332-.0937.5625c0 .2266.0234.4063.0938.5625.0703.1563.1601.2813.2812.375.121.0938.2734.1484.4375.1875.164.039.3164.0625.5.0625.1797 0 .371-.0234.5313-.0625.1601-.039.2851-.0938.4062-.1875.121-.0938.211-.2188.2813-.375.0703-.1523.125-.336.125-.5625 0-.2305-.0547-.4102-.125-.5625-.0704-.1523-.1602-.2813-.2813-.375-.121-.0938-.246-.1836-.4063-.2188-.1601-.0351-.3515-.0312-.5312-.0312zm-1.2188 3.3438v8.9687h2.4375V9.1562z" />
  </Icon>
);

export const IconCancel = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 16 16" block={block}>
    <path d="M15.7 14.3c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3s-.5-.1-.7-.3L8 9.4l-6.3 6.3c-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.4-.4-.4-1 0-1.4L6.6 8 .3 1.7C-.1 1.3-.1.7.3.3c.4-.4 1-.4 1.4 0L8 6.6 14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L9.4 8l6.3 6.3z" />
  </Icon>
);

export const IconChevronDown = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 18 18" block={block}>
    <path d="M17.7 5L9 13.7.3 5l.7-.7 8 8 8-8 .7.7z" />
  </Icon>
);

export const IconChevronLeft = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 18 18" block={block}>
    <path d="M13 17.7L4.3 9 13 .3l.7.7-8 8 8 8-.7.7z" />
  </Icon>
);

export const IconChevronRight = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 18 18" block={block}>
    <path d="M5 .3L13.7 9 5 17.7l-.7-.7 8-8-8-8L5 .3z" />
  </Icon>
);

export const IconCheck = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 16 16" block={block}>
    <path d="M15.6 4.3l-9.3 9.4c-.5.5-1.4.5-1.9 0l-4-4c-.5-.5-.5-1.4 0-1.9s1.3-.5 1.9 0l3.1 3.1 8.4-8.5c.5-.5 1.4-.5 1.9 0s.4 1.3-.1 1.9z" />
  </Icon>
);

export const IconRadio = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 16 16" block={block}>
    <path d="M13 8c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5zm3 0c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm-1 0c0-3.9-3.1-7-7-7S1 4.1 1 8s3.1 7 7 7 7-3.1 7-7z" />
  </Icon>
);

export const IconSearch = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 16 16" block={block}>
    <path d="M15.5 15.3L11 10.8c1.2-1.1 2-2.7 2-4.5C13 2.9 10.2.1 6.8.1S.5 2.8.5 6.2s2.8 6.2 6.2 6.2c1.3 0 2.5-.4 3.5-1.1l4.6 4.6.7-.6zM1.4 6.2C1.4 3.3 3.8 1 6.7 1S12 3.3 12 6.2c0 1.5-.7 2.9-1.7 3.9l-.7.5c-.8.5-1.8.8-2.8.8-3 .1-5.4-2.3-5.4-5.2z" />
  </Icon>
);

export const IconExclamationCircle = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 32 32" block={block}>
    <path d="M14.482 21.893c0-0.857 0.694-1.551 1.551-1.551s1.551 0.694 1.551 1.551c0 0.857-0.694 1.551-1.551 1.551s-1.551-0.694-1.551-1.551zM16.033 2.838c-7.271 0-13.187 5.916-13.187 13.187s5.916 13.187 13.187 13.187 13.187-5.916 13.187-13.187c0-7.271-5.916-13.187-13.187-13.187zM16.033 27.203c-6.163 0-11.178-5.015-11.178-11.178s5.015-11.178 11.178-11.178c6.164 0 11.178 5.015 11.178 11.178s-5.014 11.178-11.178 11.178zM16.033 8.308c-0.555 0-1.004 0.45-1.004 1.004v8.227c0 0.555 0.45 1.004 1.004 1.004s1.004-0.45 1.004-1.004v-8.227c0-0.555-0.45-1.004-1.004-1.004z" />
  </Icon>
);

export const IconExclamationTriangle = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 32 32" block={block}>
    <path d="M15.951 19.663c-0.457 0-0.828-0.37-0.828-0.828v-4.357c0-0.457 0.37-0.828 0.828-0.828s0.828 0.37 0.828 0.828v4.357c0 0.457-0.371 0.828-0.828 0.828zM15.952 22.906c-0.305 0-0.606-0.126-0.821-0.341s-0.338-0.514-0.338-0.818 0.122-0.606 0.338-0.821c0.431-0.43 1.209-0.43 1.639 0 0.215 0.215 0.341 0.516 0.341 0.821s-0.126 0.603-0.341 0.818c-0.215 0.215-0.513 0.341-0.818 0.341zM27.049 27.070h-22.196c-0.352 0-0.677-0.186-0.855-0.489s-0.184-0.677-0.014-0.985l11.098-20.105c0.175-0.317 0.508-0.513 0.87-0.513s0.695 0.197 0.87 0.513l11.098 20.105c0.17 0.308 0.165 0.683-0.014 0.985s-0.504 0.489-0.856 0.489zM6.536 25.083h18.83l-9.415-17.056-9.415 17.056z" />
  </Icon>
);

export const IconImage = ({ block }: IconInfoProps) => (
  <Icon viewBox="0 0 16 16" block={block}>
    <path
      d="M14.4 1.6H1.6C.7 1.6 0 2.3 0 3.2v9.6c0 .9.7 1.6 1.6 1.6h12.8c.9 0 1.6-.7 1.6-1.6V3.2c0-.9-.7-1.6-1.6-1.6zm0 11.2H1.6V3.2h12.8v9.6zM3.2 6c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2-.5 1.2-1.2 1.2S3.2 6.7 3.2 6zm.2 4.5l6.2-4.4c.4-.3.9-.2 1.1.2v.1l2.4 4.2c.1.2 0 .4-.1.5-.1 0-.1.1-.2.1H3.7c-.2 0-.4-.2-.4-.4 0-.1 0-.3.1-.3z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Icon>
);
