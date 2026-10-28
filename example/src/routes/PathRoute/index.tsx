import React from 'react';

import WaykeComposite from '../../../../src';
import { providerSettings } from '../../settings';

/** Path routing: the vehicle at /a/b/<id>, the filters in the url. */
const PathRoute = () => (
  <WaykeComposite
    composite={{ modifyDocumentTitleItem: true, modifyDocumentTitleSearch: 'Wayke' }}
    provider={{ ...providerSettings, routing: { mode: 'path', basePath: '/a/b', syncUrl: true } }}
  />
);

export default PathRoute;
