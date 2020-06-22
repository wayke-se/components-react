import { createContext } from 'react';

interface SettingsContextProps {
  googleMapsApiKey?: string;
}

export const SettingsContext = createContext<SettingsContextProps>({});
