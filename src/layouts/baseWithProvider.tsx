import React from 'react';

import WaykeProvider, { WaykeProviderProps } from '../providers/WaykeProvider';
import BaseLayout, { BaseLayoutProps } from './base';

interface BaseLayoutWithProviderProps {
  provider: WaykeProviderProps;
  base: BaseLayoutProps;
}

const BaseLayoutWithProvider = ({ provider, base }: BaseLayoutWithProviderProps) => (
  <WaykeProvider {...provider}>
    <BaseLayout {...base} />
  </WaykeProvider>
);

export default BaseLayoutWithProvider;
