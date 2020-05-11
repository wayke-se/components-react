import React from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../../layout/global-style';
import theme from '../../layout/theme';

interface ThemeProps {
  children: JSX.Element | JSX.Element[];
}

const Theme = ({ children }: ThemeProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
