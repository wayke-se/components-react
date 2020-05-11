import React from 'react';

import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import GlobalStyle from '../layout/global-style';
import theme from '../layout/theme';

interface ThemeProps {
  children: JSX.Element | JSX.Element[];
}

const ThemeProvider = ({ children }: ThemeProps): JSX.Element => (
  <ThemeProviderBase theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProviderBase>
);

export default ThemeProvider;
