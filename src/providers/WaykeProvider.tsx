import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';

import '@wayke-se/ecom-react/assets/styles/default.css';
import useEcom from '../hooks/useEcom';
import SettingsProvider from './settingsProvider';
import SearchSearchProvider from './relatedSearchProvider';
import CentralStorageProvider from './centralStorageProvider';

export interface EcomSettings {
  url: string;
  useBankId?: boolean;
  displayBankIdAlert?: boolean;
}

export interface WaykeProviderSettings {
  url: string;
  apiKey?: string;
  graphQlUrl: string;
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
}

export type WaykeProviderProps = WaykeProviderSettings & {
  children?: React.ReactNode;
};

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
      <CentralStorageProvider>
        <GraphqlProvider uri={graphQlUrl}>
          <SearchProvider url={url} apiKey={apiKey}>
            <SearchSearchProvider url={url} apiKey={apiKey}>
              <Theme>{children}</Theme>
            </SearchSearchProvider>
          </SearchProvider>
        </GraphqlProvider>
      </CentralStorageProvider>
    </SettingsProvider>
  );
};

export default WaykeProvider;
