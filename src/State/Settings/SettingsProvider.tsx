import React from 'react';
import { EcomSettings } from '../../providers/WaykeProvider';
import { SettingsContext } from './SettingsContext';

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
