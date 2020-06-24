import React from 'react';

import WaykeProvider, { WaykeProviderProps } from '../providers/WaykeProvider';
import WaykeComposite, { WaykeCompositeProps } from './WaykeComposite';

interface WaykeCompositeWithProviderProps {
  provider: WaykeProviderProps;
  composite?: WaykeCompositeProps;
}

const WaykeCompositeWithProvider = ({ provider, composite }: WaykeCompositeWithProviderProps) => (
  <WaykeProvider {...provider}>
    <WaykeComposite {...composite} />
  </WaykeProvider>
);

export default WaykeCompositeWithProvider;
