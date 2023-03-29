import styled, { css } from 'styled-components';

interface LinkProps {
  $hoverGhost?: boolean;
}

export const Link = styled.a.attrs(() => ({
  className: 'wayke__theme wayke__color--primary-text',
}))<LinkProps>`
  text-decoration: none;
  cursor: pointer;
  text-decoration: underline;

  :not(:hover) {
    color: ${(props) => props.theme.color.textDark};
  }

  &:hover {
    text-decoration: underline;
  }

  ${({ $hoverGhost }) =>
    $hoverGhost &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `}
`;
