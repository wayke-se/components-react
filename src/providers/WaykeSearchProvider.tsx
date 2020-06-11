import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';

interface WaykeSearchProviderProps {
  url: string;
  apiKey: string;
  graphQlUrl: string;
  useMock?: boolean;
  children: JSX.Element;
}

const WaykeSearchProvider = ({
  url,
  apiKey,
  graphQlUrl,
  useMock,
  children,
}: WaykeSearchProviderProps): JSX.Element => (
  <GraphqlProvider uri={graphQlUrl} useMock={useMock}>
    <SearchProvider url={url} apiKey={apiKey}>
      <Theme>{children}</Theme>
    </SearchProvider>
  </GraphqlProvider>
);

export default WaykeSearchProvider;
