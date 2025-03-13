import React from 'react';

import packageJson from '../../package.json';
import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import SearchProvider from '../State/Search/SearchProvider';
import Root from '../components/Root';

import SettingsProvider from '../State/Settings/SettingsProvider';
import RelatedSearchProvider from '../State/RelatedSearch/RelatedSearchProvider';
import CentralStorageProvider from '../State/CentralStorage/CentralStorageProvider';
import PathProvider from '../State/Path/PathProvider';

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
  pathRoute?: string;
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
  pathRoute,
  children,
}: WaykeProviderProps) => (
  <PathProvider>
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
            pathRoute={pathRoute}
          >
            <RelatedSearchProvider url={url} urlMlt={urlMlt} apiKey={apiKey}>
              <Theme>
                <Root data-version={packageJson.version}>{children}</Root>
              </Theme>
            </RelatedSearchProvider>
          </SearchProvider>
        </GraphqlProvider>
      </CentralStorageProvider>
    </SettingsProvider>
  </PathProvider>
);

export default WaykeProvider;
