import { MarketCode } from '../@types/market';
import { PublicApiConfig } from './client';

/** What every request to the public API needs, resolved once by the provider. */
export interface PublicApiSettings {
  api: PublicApiConfig;
  /** Narrows the search to a group of branches; without it the key's own scope applies */
  branchGroupId?: string;
  market: MarketCode;
}
