import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';

import '@wayke-se/ecom-react/assets/styles/default.css';
import useEcom from '../hooks/useEcom';
import SettingsProvider from './settingsProvider';
import SearchSearchProvider from './relatedSearchProvider';

export interface EcomSettings {
  url: string;
  useBankId?: boolean;
  displayBankIdAlert?: boolean;
}

export interface WaykeProviderProps {
  url: string;
  apiKey: string;
  graphQlUrl: string;
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
  children?: React.ReactNode;
}

const WaykeProvider = ({
  url,
  apiKey,
  ecomSettings,
  graphQlUrl,
  googleMapsApiKey,
  children,
}: WaykeProviderProps) => {
  useEcom(ecomSettings?.url);

  return (
    <SettingsProvider googleMapsApiKey={googleMapsApiKey} ecomSettings={ecomSettings}>
      <GraphqlProvider uri={graphQlUrl}>
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
