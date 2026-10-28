import { createContext } from 'react';
import { AdsResult } from '../../Gql/types';
import { AdsSearchResult } from '../../Gql/useAdsSearch';

export interface SearchContextProps {
  /** The filters in the searchParams.ts grammar; empty until the search has initialized */
  params: URLSearchParams;
  /** The filtered result, every page loaded so far */
  result?: AdsSearchResult;
  /** Facets and histograms without filters: the panel's full value lists and slider domains */
  unfiltered?: AdsResult;
  loading: boolean;
  loadingMore: boolean;
  error: boolean;
  hasMore: boolean;
  /** Applies new filters. Old keys and sort tokens are translated. */
  update: (next: URLSearchParams | string) => void;
  loadMore: () => void;
  /** Starts the search with the url's filters and/or initialQueryParams */
  initialize: (initialQueryParams?: URLSearchParams) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  params: new URLSearchParams(),
  loading: false,
  loadingMore: false,
  error: false,
  hasMore: false,
  update: () => undefined,
  loadMore: () => undefined,
  initialize: () => undefined,
});
