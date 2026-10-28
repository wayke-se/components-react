import React, { useMemo } from 'react';

import packageJson from '../../package.json';
import Root from '../components/Root';
import useInitializeTranslation from '../hooks/useInitializeTranslation';
import RouterProvider from '../State/Router/RouterProvider';
import SearchProvider from '../State/Search/SearchProvider';
import { SettingsContext } from '../State/Settings/SettingsContext';
import { resolveSettings, WaykeProviderSettings } from '../State/Settings/settings';
import Theme from './themeProvider';

export type { EcomSettings, WaykeProviderSettings } from '../State/Settings/settings';

export type WaykeProviderProps = WaykeProviderSettings & {
  children?: React.ReactNode;
};

/**
 * Settings, routing, the search state and the theme for every Wayke component
 * under it. Place it close to the root of the app, so its cache is kept.
 */
const WaykeProvider = ({ children, ...settings }: WaykeProviderProps) => {
  // Settings arrive as a new object on every render of the parent; only their content matters.
  const key = JSON.stringify(settings);
  const resolved = useMemo(() => resolveSettings(settings), [key]);
  const initialized = useInitializeTranslation(resolved.marketCode);

  return (
    <SettingsContext.Provider value={resolved}>
      <RouterProvider>
        <SearchProvider>
          <Theme>
            <Root data-version={packageJson.version}>{initialized ? children : null}</Root>
          </Theme>
        </SearchProvider>
      </RouterProvider>
    </SettingsContext.Provider>
  );
};

export default WaykeProvider;
