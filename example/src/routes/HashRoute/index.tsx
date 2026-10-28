import React from 'react';

import WaykeComposite from '../../../../src';
import { providerSettings } from '../../settings';

/** Hash routing with the filters in the url. */
const HashRoute = () => (
  <WaykeComposite provider={{ ...providerSettings, routing: { syncUrl: true } }} />
);

export default HashRoute;
