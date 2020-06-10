import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';

interface WaykeSearchProviderProps {
  url: string;
  apiKey: string;
  useMock?: boolean;
  children: JSX.Element;
}

const WaykeSearchProvider = ({
  url,
  apiKey,
  useMock,
  children,
}: WaykeSearchProviderProps): JSX.Element => (
  <GraphqlProvider useMock={useMock}>
    <SearchProvider url={url} apiKey={apiKey}>
      <Theme>{children}</Theme>
    </SearchProvider>
  </GraphqlProvider>
);

export default WaykeSearchProvider;
