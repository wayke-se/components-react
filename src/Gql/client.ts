// Thin client for Wayke's public GraphQL API (public-api.wayke.com). The key is
// the site's own origin unless an explicit key is given (local development).
// Identical queries are deduplicated and cached for the page's lifetime, so going
// back and forth between the list and an ad does not cost another request.

import packageJson from '../../package.json';

/**
 * Tells the API which client and version a request comes from. Kong sets
 * x-graphql-client-name to the site's key (its domain), but passes this header on,
 * so Hive and the gateway's traces show which sites run which version.
 */
const CLIENT_VERSION = `components-react@${packageJson.version}`;

export interface PublicApiConfig {
  url: string;
  apiKey?: string;
}

export type GqlErrorKind = 'unauthorized' | 'rate-limited' | 'graphql' | 'network';

export class GqlError extends Error {
  readonly kind: GqlErrorKind;
  readonly retryAfter?: number;

  constructor(kind: GqlErrorKind, message: string, retryAfter?: number) {
    super(message);
    this.kind = kind;
    this.retryAfter = retryAfter;
  }
}

const cache = new Map<string, unknown>();
const pending = new Map<string, Promise<unknown>>();

const resolveApiKey = (config: PublicApiConfig) => config.apiKey || window.location.origin;

const request = async <T>(
  config: PublicApiConfig,
  query: string,
  variables: Record<string, unknown>
): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': resolveApiKey(config),
        'x-graphql-client-version': CLIENT_VERSION,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (_e) {
    throw new GqlError('network', 'network');
  }

  if (response.status === 401) throw new GqlError('unauthorized', 'unauthorized');
  if (response.status === 429) {
    const retryAfter = Number(response.headers.get('retry-after')) || undefined;
    throw new GqlError('rate-limited', 'rate-limited', retryAfter);
  }

  const body = (await response.json().catch(() => null)) as {
    data?: T;
    errors?: { message: string }[];
  } | null;
  if (!response.ok || !body) throw new GqlError('network', `HTTP ${response.status}`);
  if (body.errors?.length) {
    throw new GqlError('graphql', body.errors.map((e) => e.message).join('; '));
  }
  return body.data as T;
};

export const gqlQuery = <T>(
  config: PublicApiConfig,
  query: string,
  variables: Record<string, unknown>
): Promise<T> => {
  const key = JSON.stringify([config.url, resolveApiKey(config), query, variables]);
  if (cache.has(key)) return Promise.resolve(cache.get(key) as T);
  const inflight = pending.get(key);
  if (inflight) return inflight as Promise<T>;

  const promise = request<T>(config, query, variables)
    .then((data) => {
      cache.set(key, data);
      return data;
    })
    .finally(() => pending.delete(key));
  pending.set(key, promise);
  return promise;
};
