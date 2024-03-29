import { createContext } from 'react';

export interface SettingsContextProps {
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
  ecomSettings?: {
    url: string;
    useBankId?: boolean;
    displayBankIdAlert?: boolean;
    serviceLogotypeUrl?: string;
    bankIdThumbprint?: string;
  };
}

export const SettingsContext = createContext<SettingsContextProps>({});
