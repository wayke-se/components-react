import React from 'react';

import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import GlobalStyle from '../layout/global-style';
import theme from '../layout/theme';

interface ThemeProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProps) => (
  <ThemeProviderBase theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProviderBase>
);

export default ThemeProvider;
