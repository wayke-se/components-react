import { WaykeProviderSettings } from '../../src';

/** Test data by default; set WAYKE_ENVIRONMENT=production in .env for production. */
export const providerSettings: WaykeProviderSettings = {
  environment: (process.env.WAYKE_ENVIRONMENT as WaykeProviderSettings['environment']) || 'test',
  ecom: { serviceLogotypeUrl: '/images/wayke-logo.svg' },
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  // A test key for a branch with more test data than the one localhost is registered on.
  apiKey: process.env.WAYKE_API_KEY,
};
