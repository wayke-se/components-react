import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';

import '@wayke-se/ecom-react/assets/styles/default.css';
import useEcom from '../hooks/useEcom';

interface WaykeProviderProps {
  url: string;
  apiKey: string;
  graphQlUrl: string;
  ecomUrl?: string;
  useMock?: boolean;
  children: JSX.Element;
}

const WaykeProvider = ({
  url,
  apiKey,
  ecomUrl,
  graphQlUrl,
  useMock,
  children,
}: WaykeProviderProps): JSX.Element => {
  useEcom(ecomUrl);
  return (
    <GraphqlProvider uri={graphQlUrl} useMock={useMock}>
      <SearchProvider url={url} apiKey={apiKey}>
        <Theme>{children}</Theme>
      </SearchProvider>
    </GraphqlProvider>
  );
};

export default WaykeProvider;
