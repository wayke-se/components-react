import React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager, ThemeProvider as ThemeProviderBase } from 'styled-components';

import theme from '../layout/theme';

interface ThemeProps {
  children: React.ReactNode;
}

// Restore styled-components v5 behavior: filter out non-standard props so
// they are not forwarded to DOM elements (custom components still receive all props)
const shouldForwardProp = (propName: string, target: unknown) =>
  typeof target === 'string' ? isPropValid(propName) : true;

const ThemeProvider = ({ children }: ThemeProps) => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>
  </StyleSheetManager>
);

export default ThemeProvider;
