import React from 'react';
import { EcomSettings } from '../../providers/WaykeProvider';
import { SettingsContext } from './SettingsContext';

interface SettingsProps {
  apiUrl?: string;
  ecomSettings?: EcomSettings;
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
  children: React.ReactNode;
}

const SettingsProvider = ({
  apiUrl,
  googleMapsApiKey,
  googleMapsMarker,
  ecomSettings,
  children,
}: SettingsProps) => (
  <SettingsContext.Provider value={{ apiUrl, ecomSettings, googleMapsApiKey, googleMapsMarker }}>
    {children}
  </SettingsContext.Provider>
);

export default SettingsProvider;
