import { createContext } from 'react';

interface SettingsContextProps {
  googleMapsApiKey?: string;
  ecomSettings?: {
    useBankId?: boolean;
    displayBankIdAlert?: boolean;
  };
}

export const SettingsContext = createContext<SettingsContextProps>({});
