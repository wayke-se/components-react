import React from 'react';

import packageJson from '../../package.json';
import Root from '../components/Root';
import CentralStorageProvider from '../State/CentralStorage/CentralStorageProvider';
import PathProvider from '../State/Path/PathProvider';
import RelatedSearchProvider from '../State/RelatedSearch/RelatedSearchProvider';
import SettingsProvider from '../State/Settings/SettingsProvider';
import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';

export interface EcomSettings {
  url: string;
  /** @deprecated Not used since 3.0.0. Will be removed in the next major version. */
  useBankId?: boolean;
  /** @deprecated Not used since 3.0.0. Will be removed in the next major version. */
  displayBankIdAlert?: boolean;
  serviceLogotypeUrl?: string;
  bankIdThumbprint?: string;
}

export interface WaykeItemProviderSettings {
  url: string;
  urlMlt?: string;
  graphQlUrl: string;
  apiKey?: string;
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
}

export type WaykeItemProviderProps = WaykeItemProviderSettings & {
  children?: React.ReactNode;
};

const WaykeItemProvider = ({
  url,
  urlMlt,
  apiKey,
  ecomSettings,
  graphQlUrl,
  googleMapsApiKey,
  googleMapsMarker,
  children,
}: WaykeItemProviderProps) => (
  <PathProvider>
    <SettingsProvider
      googleMapsApiKey={googleMapsApiKey}
      googleMapsMarker={googleMapsMarker}
      ecomSettings={ecomSettings}
    >
      <CentralStorageProvider>
        <GraphqlProvider uri={graphQlUrl}>
          <RelatedSearchProvider url={url} urlMlt={urlMlt} apiKey={apiKey}>
            <Theme>
              <Root data-version={packageJson.version}>{children}</Root>
            </Theme>
          </RelatedSearchProvider>
        </GraphqlProvider>
      </CentralStorageProvider>
    </SettingsProvider>
  </PathProvider>
);

export default WaykeItemProvider;
