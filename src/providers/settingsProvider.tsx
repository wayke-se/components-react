import React from 'react';
import { SettingsContext } from '../context/settings-context';
import { EcomSettings } from './WaykeProvider';

interface SettingsProps {
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
  children: React.ReactNode;
}

const SettingsProvider = ({ googleMapsApiKey, ecomSettings, children }: SettingsProps) => (
  <SettingsContext.Provider value={{ ecomSettings, googleMapsApiKey }}>
    {children}
  </SettingsContext.Provider>
);

export default SettingsProvider;
