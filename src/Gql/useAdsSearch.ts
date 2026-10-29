// The search page's data: one request per filter change for the list and its
// facets, plus one unfiltered request for the panel's full value lists and
// slider domains. Responses that arrive after the filters changed are dropped.

import { useCallback, useEffect, useRef, useState } from 'react';
import { gqlQuery } from './client';
import { PublicApiSettings } from './config';
import { buildSearchQuery, FACETS_QUERY, multiSelectFacetAlias, SEARCH_QUERY } from './queries';
import { LIST_FILTERS, toSearchVariables } from './searchParams';
import { AdsResult, Facet, FacetsData, SearchData, SearchHit } from './types';

export interface AdsSearchResult {
  found: number;
  page: number;
  perPage: number;
  /** Every page loaded so far */
  hits: SearchHit[];
  /** List facets of the filtered result, each selected one counted without its own filter */
  facets: Facet[];
}

/** The facets of the filtered result, with every selected list filter's facet counted without its own filter. */
const withMultiSelectFacets = (data: SearchData, ads: AdsResult, selected: string[]): Facet[] =>
  (ads.facets || []).map((facet) => {
    if (!selected.includes(facet.field)) return facet;
    const alias = data.search?.[multiSelectFacetAlias(facet.field)] as
      | { facets?: Facet[] | null }
      | undefined;
    return alias?.facets?.find((f) => f.field === facet.field) || facet;
  });

const useAdsSearch = (params: URLSearchParams | undefined, settings: PublicApiSettings) => {
  const [unfiltered, setUnfiltered] = useState<AdsResult>();
  const [result, setResult] = useState<AdsSearchResult>();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const requestIndex = useRef(0);

  const paramsKey = params?.toString();
  const { api, market, branchGroupId } = settings;

  const variables = useCallback(
    (page: number) => ({
      ...toSearchVariables(params || new URLSearchParams(), market, { page }),
      branchGroupId,
    }),
    [paramsKey, market, branchGroupId]
  );

  const started = !!params;

  useEffect(() => {
    if (!started) return;
    gqlQuery<FacetsData>(api, FACETS_QUERY, { market: [market], branchGroupId })
      .then((data) => setUnfiltered(data.search?.ads || undefined))
      .catch(() => setError(true));
  }, [started, api.url, api.apiKey, market, branchGroupId]);

  useEffect(() => {
    // No params until the provider has read the initial filters.
    if (!params) return;
    const index = ++requestIndex.current;
    setLoading(true);
    setError(false);
    const selected = LIST_FILTERS.filter((field) => params.getAll(field).length > 0);
    gqlQuery<SearchData>(api, buildSearchQuery(selected), { ...variables(1), withFacets: true })
      .then((data) => {
        if (index !== requestIndex.current) return;
        const ads = data.search?.ads;
        setResult(
          ads
            ? {
                found: ads.found,
                page: ads.page,
                perPage: ads.perPage,
                hits: ads.hits,
                facets: withMultiSelectFacets(data, ads, selected),
              }
            : undefined
        );
      })
      .catch(() => {
        if (index === requestIndex.current) setError(true);
      })
      .finally(() => {
        if (index === requestIndex.current) setLoading(false);
      });
  }, [paramsKey, variables, api.url, api.apiKey]);

  const hasMore = !!result && result.page * result.perPage < result.found;

  const loadMore = useCallback(async () => {
    if (!result || !hasMore || loadingMore) return;
    const index = requestIndex.current;
    setLoadingMore(true);
    setError(false);
    try {
      const data = await gqlQuery<SearchData>(api, SEARCH_QUERY, {
        ...variables(result.page + 1),
        withFacets: false,
      });
      // The filters changed while this page was loading: it belongs to the old list.
      if (index !== requestIndex.current) return;
      const ads = data.search?.ads;
      if (ads) {
        setResult((current) =>
          current
            ? { ...current, page: ads.page, found: ads.found, hits: [...current.hits, ...ads.hits] }
            : current
        );
      }
    } catch (_e) {
      if (index === requestIndex.current) setError(true);
    } finally {
      setLoadingMore(false);
    }
  }, [result, hasMore, loadingMore, variables, api.url, api.apiKey]);

  return { unfiltered, result, loading, loadingMore, error, hasMore, loadMore };
};

export default useAdsSearch;
