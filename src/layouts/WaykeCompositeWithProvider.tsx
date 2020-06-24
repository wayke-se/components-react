import React from 'react';

import WaykeProvider, { WaykeProviderProps } from '../providers/WaykeProvider';
import BaseLayout, { WaykeCompositeProps } from './WaykeComposite';

interface WaykeCompositeWithProviderProps {
  provider: WaykeProviderProps;
  base?: WaykeCompositeProps;
}

const WaykeCompositeWithProvider = ({ provider, base }: WaykeCompositeWithProviderProps) => (
  <WaykeProvider {...provider}>
    <BaseLayout {...base} />
  </WaykeProvider>
);

export default WaykeCompositeWithProvider;
