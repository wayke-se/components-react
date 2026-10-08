import { createContext } from 'react';

export interface SettingsContextProps {
  /** Base URL of the Wayke API (same host as the search url). Used for lead submission. */
  apiUrl?: string;
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
  ecomSettings?: {
    url: string;
    serviceLogotypeUrl?: string;
    bankIdThumbprint?: string;
  };
}

export const SettingsContext = createContext<SettingsContextProps>({});
