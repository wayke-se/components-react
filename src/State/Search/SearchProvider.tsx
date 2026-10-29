import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { hasLegacyParams, migrateLegacyParams } from '../../Gql/legacyParams';
import { canonicalParams } from '../../Gql/searchParams';
import useAdsSearch from '../../Gql/useAdsSearch';
import { ActionOnFilterUpdate } from '../../utils/pubsub/Actions';
import WaykePubSub from '../../utils/pubsub/pubsub';
import useRouter from '../Router/useRouter';
import useSettings from '../Settings/useSettings';
import { SearchContext, SearchContextProps } from './SearchContext';

/** Any input → the canonical new grammar, with a hint when a site still sends the old one. */
const toParams = (input: URLSearchParams | string, source: string) => {
  const params = typeof input === 'string' ? new URLSearchParams(input) : input;
  if (hasLegacyParams(params)) {
    // biome-ignore lint/suspicious/noConsole: tells the site's developer what to change
    console.warn(
      `Wayke: ${source} uses filter names from before 6.0 (${params}); they are translated, see the README for the new names`
    );
    return migrateLegacyParams(params);
  }
  return canonicalParams(params);
};

interface SearchProviderProps {
  children: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const { publicApi, routing } = useSettings();
  const { search, writeSearch } = useRouter();
  // Undefined until a search component initializes it, so a vehicle page alone costs no search.
  const [params, setParams] = useState<URLSearchParams>();
  const lastWritten = useRef<string | undefined>(undefined);

  const { unfiltered, result, loading, loadingMore, error, hasMore, loadMore } = useAdsSearch(
    params,
    publicApi
  );

  const apply = useCallback(
    (next: URLSearchParams, replace?: boolean) => {
      lastWritten.current = next.toString();
      setParams(next);
      writeSearch(next, replace);
    },
    [writeSearch]
  );

  const initialize = useCallback(
    (initialQueryParams?: URLSearchParams) => {
      if (params) return;
      let next = initialQueryParams
        ? toParams(initialQueryParams, 'initialQueryParams')
        : undefined;
      if (routing.syncUrl) {
        // The url wins; initialQueryParams only adds what the url does not have.
        const fromUrl = toParams(search, 'The url');
        next?.forEach((value, key) => {
          if (!fromUrl.getAll(key).includes(value)) fromUrl.append(key, value);
        });
        next = canonicalParams(fromUrl);
      }
      apply(next || new URLSearchParams(), true);
    },
    [params, routing.syncUrl, search, apply]
  );

  const update = useCallback(
    (next: URLSearchParams | string) => apply(toParams(next, 'onFilterUpdate')),
    [apply]
  );

  // Back and forward in the browser: the url's filters, unless we wrote them ourselves.
  useEffect(() => {
    if (!params || !routing.syncUrl) return;
    const fromUrl = toParams(search, 'The url');
    if (fromUrl.toString() !== lastWritten.current) {
      lastWritten.current = fromUrl.toString();
      setParams(fromUrl);
    }
  }, [search]);

  useEffect(() => {
    const action: ActionOnFilterUpdate = { actionName: 'onFilterUpdate', callback: update };
    WaykePubSub.subscribeAction(action);
    return () => WaykePubSub.unsubscribeAction(action);
  }, [update]);

  const value = useMemo<SearchContextProps>(
    () => ({
      params: params || new URLSearchParams(),
      result,
      unfiltered,
      loading: loading || !result,
      loadingMore,
      error,
      hasMore,
      update,
      loadMore,
      initialize,
    }),
    [params, result, unfiltered, loading, loadingMore, error, hasMore, update, loadMore, initialize]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
