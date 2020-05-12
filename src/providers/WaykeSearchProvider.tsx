import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';

interface WaykeSearchProviderProps {
  useMock?: boolean;
  children: JSX.Element;
}

const WaykeSearchProvider = ({ useMock, children }: WaykeSearchProviderProps): JSX.Element => (
  <GraphqlProvider useMock={useMock}>
    <Theme>{children}</Theme>
  </GraphqlProvider>
);

export default WaykeSearchProvider;
