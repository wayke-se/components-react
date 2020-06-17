import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const ContentLogo = styled.div`
  ${(props) => props.theme.breakpoint.Sm} {
    display: flex;
    align-items: flex-start;
  }
`;

export const ContentLogoText = styled.div`
  ${(props) => props.theme.breakpoint.Sm} {
    flex: 1 1 auto;
  }
`;

export const ContentLogoMedia = styled.div`
  ${(props) => props.theme.breakpoint.LtSm} {
    margin-top: ${size(2)};
  }

  ${(props) => props.theme.breakpoint.Sm} {
    flex-shrink: 0;
    padding-left: ${size(2)};
  }
`;
