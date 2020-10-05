import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';
import Root from '../components/Root/index';

import useEcom from '../hooks/useEcom';
import SettingsProvider from './settingsProvider';
import SearchSearchProvider from './relatedSearchProvider';
import CentralStorageProvider from './centralStorageProvider';

export interface EcomSettings {
  url: string;
  useBankId?: boolean;
  displayBankIdAlert?: boolean;
  serviceLogotypeUrl?: string;
}

export interface WaykeProviderSettings {
  url: string;
  apiKey?: string;
  graphQlUrl: string;
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
  useQueryParamsFromUrl?: boolean;
  compressQueryParams?: boolean;
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
  googleMapsMarker,
  useQueryParamsFromUrl,
  compressQueryParams,
  children,
}: WaykeProviderProps) => {
  useEcom(ecomSettings?.url);

  return (
    <SettingsProvider
      googleMapsApiKey={googleMapsApiKey}
      googleMapsMarker={googleMapsMarker}
      ecomSettings={ecomSettings}
    >
      <CentralStorageProvider>
        <GraphqlProvider uri={graphQlUrl}>
          <SearchProvider
            url={url}
            apiKey={apiKey}
            useQueryParamsFromUrl={useQueryParamsFromUrl}
            compressQueryParams={compressQueryParams}
          >
            <SearchSearchProvider url={url} apiKey={apiKey}>
              <Theme>
                <Root>{children}</Root>
              </Theme>
            </SearchSearchProvider>
          </SearchProvider>
        </GraphqlProvider>
      </CentralStorageProvider>
    </SettingsProvider>
  );
};

export default WaykeProvider;
