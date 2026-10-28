import React from 'react';

import WaykeComposite from '../../../../src';
import { providerSettings } from '../../settings';

const Home = () => (
  <WaykeComposite
    composite={{
      modifyDocumentTitleItem: true,
      modifyDocumentTitleSearch: 'Wayke',
      displayBranchName: true,
      conversionOptions: [
        { type: 'leadMessage' },
        { type: 'leadCallMe' },
        { type: 'ecom' },
        { type: 'email' },
        { type: 'phone' },
      ],
    }}
    provider={providerSettings}
  />
);

export default Home;
