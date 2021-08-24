import React from 'react';

import GraphqlProvider from './graphqlProvider';
import Theme from './themeProvider';
import Root from '../components/Root/index';

import useEcom from '../hooks/useEcom';
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
}: WaykeItemProviderProps) => {
  useEcom(ecomSettings);

  return (
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
                <Root>{children}</Root>
              </Theme>
            </RelatedSearchProvider>
          </GraphqlProvider>
        </CentralStorageProvider>
      </SettingsProvider>
    </PathProvider>
  );
};

export default WaykeItemProvider;
