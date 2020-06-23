import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';

import '@wayke-se/ecom-react/assets/styles/default.css';
import useEcom from '../hooks/useEcom';
import SettingsProvider from './settingsProvider';
import SearchSearchProvider from './relatedSearchProvider';

export interface WaykeProviderProps {
  url: string;
  apiKey: string;
  graphQlUrl: string;
  ecomUrl?: string;
  googleMapsApiKey?: string;
  useMock?: boolean;
  children: React.ReactNode;
}

const WaykeProvider = ({
  url,
  apiKey,
  ecomUrl,
  graphQlUrl,
  googleMapsApiKey,
  useMock,
  children,
}: WaykeProviderProps) => {
  useEcom(ecomUrl);

  return (
    <SettingsProvider googleMapsApiKey={googleMapsApiKey}>
      <GraphqlProvider uri={graphQlUrl} useMock={useMock}>
        <SearchProvider url={url} apiKey={apiKey}>
          <SearchSearchProvider url={url} apiKey={apiKey}>
            <Theme>{children}</Theme>
          </SearchSearchProvider>
        </SearchProvider>
      </GraphqlProvider>
    </SettingsProvider>
  );
};

export default WaykeProvider;
