import React from 'react';

import WaykeProvider, { WaykeProviderProps } from '../providers/WaykeProvider';
import WaykeCompositePath, { WaykeCompositePathProps } from './WaykeCompositePath';

export interface WaykeCompositePathWithProviderProps {
  provider: WaykeProviderProps;
  composite?: WaykeCompositePathProps;
}

const WaykeCompositeWithProvider = ({
  provider,
  composite,
}: WaykeCompositePathWithProviderProps) => (
  <WaykeProvider {...provider}>
    <WaykeCompositePath {...composite} />
  </WaykeProvider>
);

export default WaykeCompositeWithProvider;
