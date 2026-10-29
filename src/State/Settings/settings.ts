import { MarketCode } from '../../@types/market';
import { PublicApiSettings } from '../../Gql/config';

export type Environment = 'production' | 'test';

const ENVIRONMENTS: Record<
  Environment,
  { publicApiUrl: string; leadUrl: string; ecomUrl: string }
> = {
  production: {
    publicApiUrl: 'https://public-api.wayke.com/graphql',
    leadUrl: 'https://api.wayke.se/lead',
    ecomUrl: 'https://ecom.wayke.se',
  },
  test: {
    publicApiUrl: 'https://public-test-api.wayke.com/graphql',
    leadUrl: 'https://api.wayketech.se/lead',
    ecomUrl: 'https://ecom.wayketech.se',
  },
};

export type RoutingMode = 'hash' | 'path' | 'none';

export interface RoutingSettings {
  /**
   * How a vehicle is opened from the search. `hash` (default) adds `#<id>` to
   * the url, `path` links to `<basePath>/<id>`, `none` makes the vehicles plain
   * cards and only publishes `ItemClicked`.
   */
  mode?: RoutingMode;
  /** Required for `path`. Relative to the current page, or an absolute url to another site. */
  basePath?: string;
  /** Reads and writes the search filters in the url. */
  syncUrl?: boolean;
}

export interface EcomSettings {
  /**
   * Buy online is shown on the vehicles the dealer sells online. `false` hides it
   * on this site. Default `true`.
   */
  enabled?: boolean;
  /** Defaults to the ecom API of `environment`. */
  url?: string;
  /** Url to the logo shown in buy online, as an image file (not a `data:` url). */
  serviceLogotypeUrl?: string;
  bankIdThumbprint?: string;
}

export interface WaykeProviderSettings {
  /** Which Wayke environment to use. Default `production`. */
  environment?: Environment;
  /** Identifies the site instead of its domain. Sent as `x-api-key`. */
  apiKey?: string;
  /** Limits the vehicles to a group of branches. By default the key decides which vehicles are shown. */
  branchGroupId?: string;
  /** Language and market. Default `SE`. */
  marketCode?: MarketCode;
  routing?: RoutingSettings;
  /** Buy online, see EcomSettings. */
  ecom?: EcomSettings;
  /** A Google Maps Static API key. Without it, the map button opens Google Maps. */
  googleMapsApiKey?: string;
  /** Url to a custom marker for the map. */
  googleMapsMarker?: string;
  /** Overrides the public API url of `environment`. */
  publicApiUrl?: string;
  /** Overrides the lead url of `environment`. */
  leadUrl?: string;
}

export interface Settings {
  publicApi: PublicApiSettings;
  marketCode: MarketCode;
  leadUrl: string;
  routing: Required<Omit<RoutingSettings, 'basePath'>> & { basePath?: string };
  /** Undefined when buy online is turned off. */
  ecom?: Required<Pick<EcomSettings, 'url'>> & Omit<EcomSettings, 'enabled'>;
  googleMapsApiKey?: string;
  googleMapsMarker?: string;
}

/** 5.x settings that 6.0 no longer reads, and what replaces them. */
const REMOVED_SETTINGS: Record<string, string> = {
  url: 'environment',
  urlMlt: 'environment',
  graphQlUrl: 'environment',
  ecomSettings: 'ecom (buy online is on by default)',
  useQueryParamsFromUrl: 'routing.syncUrl',
  pathRoute: "routing: { mode: 'path', basePath }",
};

const warnRemovedSettings = (settings: object) => {
  for (const key of Object.keys(settings)) {
    if (key in REMOVED_SETTINGS) {
      // biome-ignore lint/suspicious/noConsole: tells the site's developer what to change
      console.warn(`Wayke: the setting ${key} was removed in 6.0, use ${REMOVED_SETTINGS[key]}`);
    }
  }
};

const resolveEcom = (
  { enabled = true, url, ...ecom }: EcomSettings = {},
  environmentUrl: string
): Settings['ecom'] => (enabled ? { ...ecom, url: url || environmentUrl } : undefined);

export const resolveSettings = (settings: WaykeProviderSettings = {}): Settings => {
  warnRemovedSettings(settings);
  const environment = ENVIRONMENTS[settings.environment || 'production'];
  const marketCode = settings.marketCode || 'SE';
  const mode = settings.routing?.mode || 'hash';

  if (mode === 'path' && !settings.routing?.basePath) {
    // Without a base path there is nowhere to put the vehicle id.
    // biome-ignore lint/suspicious/noConsole: tells the site's developer what to change
    console.warn('Wayke: routing.mode "path" needs routing.basePath, using "hash" instead');
  }

  return {
    publicApi: {
      api: { url: settings.publicApiUrl || environment.publicApiUrl, apiKey: settings.apiKey },
      branchGroupId: settings.branchGroupId,
      market: marketCode,
    },
    marketCode,
    leadUrl: settings.leadUrl || environment.leadUrl,
    routing: {
      mode: mode === 'path' && !settings.routing?.basePath ? 'hash' : mode,
      basePath: settings.routing?.basePath,
      syncUrl: !!settings.routing?.syncUrl,
    },
    ecom: resolveEcom(settings.ecom, environment.ecomUrl),
    googleMapsApiKey: settings.googleMapsApiKey,
    googleMapsMarker: settings.googleMapsMarker,
  };
};
