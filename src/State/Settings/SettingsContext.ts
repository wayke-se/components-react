import { createContext } from 'react';
import { resolveSettings, Settings } from './settings';

export const SettingsContext = createContext<Settings>(resolveSettings());
