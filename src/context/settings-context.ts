import { createContext } from 'react';

export interface SettingsContextProps {
  googleMapsApiKey?: string;
  ecomSettings?: {
    useBankId?: boolean;
    displayBankIdAlert?: boolean;
    serviceLogotypeUrl?: string;
  };
}

export const SettingsContext = createContext<SettingsContextProps>({});
