import React from 'react';
import { SettingsContext } from '../context/settings-context';

interface SettingsProps {
  googleMapsApiKey?: string;
  children: React.ReactNode;
}

const SettingsProvider = ({ googleMapsApiKey, children }: SettingsProps): JSX.Element => (
  <SettingsContext.Provider value={{ googleMapsApiKey }}>{children}</SettingsContext.Provider>
);

export default SettingsProvider;
