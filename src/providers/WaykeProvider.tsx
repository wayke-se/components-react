import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from './searchProvider';
import Root from '../components/Root/index';

import useEcom from '../hooks/useEcom';
import SettingsProvider from './settingsProvider';
import RelatedSearchProvider from './relatedSearchProvider';
import CentralStorageProvider from './centralStorageProvider';

export interface EcomSettings {
  url: string;
  useBankId?: boolean;
  displayBankIdAlert?: boolean;
  serviceLogotypeUrl?: string;
  bankIdThumbprint?: string;
}

export interface WaykeProviderSettings {
  url: string;
  urlMlt?: string;
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
  urlMlt,
  apiKey,
  ecomSettings,
  graphQlUrl,
  googleMapsApiKey,
  googleMapsMarker,
  useQueryParamsFromUrl,
  compressQueryParams,
  children,
}: WaykeProviderProps) => {
  useEcom(ecomSettings);

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
            <RelatedSearchProvider url={url} urlMlt={urlMlt} apiKey={apiKey}>
              <Theme>
                <Root>{children}</Root>
              </Theme>
            </RelatedSearchProvider>
          </SearchProvider>
        </GraphqlProvider>
      </CentralStorageProvider>
    </SettingsProvider>
  );
};

export default WaykeProvider;
