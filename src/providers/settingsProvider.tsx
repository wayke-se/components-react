import React from 'react';
import { SettingsContext } from '../context/settings-context';
import { EcomSettings } from './WaykeProvider';

interface SettingsProps {
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
  children: React.ReactNode;
}

const SettingsProvider = ({
  googleMapsApiKey,
  googleMapsMarker,
  ecomSettings,
  children,
}: SettingsProps) => (
  <SettingsContext.Provider value={{ ecomSettings, googleMapsApiKey, googleMapsMarker }}>
    {children}
  </SettingsContext.Provider>
);

export default SettingsProvider;
