import { Theme } from '../layout/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
