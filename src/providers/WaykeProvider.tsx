import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';

interface WaykeProviderProps {
  useMock?: boolean;
  children: JSX.Element;
}

const WaykeProvider = ({ useMock, children }: WaykeProviderProps): JSX.Element => (
  <GraphqlProvider useMock={useMock}>
    <Theme>{children}</Theme>
  </GraphqlProvider>
);

export default WaykeProvider;
