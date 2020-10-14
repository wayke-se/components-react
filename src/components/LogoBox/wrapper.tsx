import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

type LogoProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  wide?: boolean;
};

export const Logo = styled.img<LogoProps>`
  display: block;
  max-width: ${size(9.5)};
  max-height: ${size(6)};

  ${({ wide }) =>
    wide &&
    css`
      max-width: ${size(20)};
    `}
`;
