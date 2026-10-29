import React from 'react';

import { WaykeProvider, WaykeSearch } from '../../../../src';
import { providerSettings } from '../../settings';

/** The search alone: vehicles are not links, a click only publishes ItemClicked. */
const Search = () => (
  <WaykeProvider {...providerSettings} routing={{ mode: 'none' }}>
    <WaykeSearch />
  </WaykeProvider>
);

export default Search;
