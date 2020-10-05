import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Facet, Document, Search } from '../@types/search';
import { QueryFilter } from '../@types/queryFilter';
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../context/search-context';
import { getUrlSearchParamsFromUrl } from '../utils/url';

interface SearchProviderProps {
  url: string;
  apiKey?: string;
  useQueryParamsFromUrl?: boolean;
  compressQueryParams?: boolean;
  children: React.ReactNode;
}

const initialSearchParams = new URLSearchParams();
initialSearchParams.set('hits', '30');
initialSearchParams.set('sort', 'published-desc');

const SearchProvider = ({
  url,
  apiKey,
  useQueryParamsFromUrl,
  compressQueryParams,
  children,
}: SearchProviderProps) => {
  const [queryFilter, setQueryFilter] = useState<QueryFilter>({
    searchParams: initialSearchParams,
  });

  const queryFilterRef = useRef(queryFilter);
  queryFilterRef.current = queryFilter;

  const [initialFacets, setInitialFacets] = useState<Facet[]>();
  const [documents, setDocuments] = useState<Document[]>();
  const [initialize, setInitialize] = useState(false);

  const { data: initialDataRepsonse } = useFetch<Search>(
    `${url}?hits=0`,
    {
      headers: apiKey
        ? {
            'x-api-key': apiKey,
          }
        : {},
    },
    !!initialFacets
  );

  const query = queryFilter.searchParams.toString();
  const { loading, data: response, error } = useFetch<Search>(
    `${url}${query ? `?${query}` : ''}`,
    {
      headers: apiKey
        ? {
            'x-api-key': apiKey,
          }
        : {},
    },
    !initialize
  );

  const popStateEvent = (event: PopStateEvent) => {
    const { currentTarget } = event;
    if (currentTarget) {
      if (compressQueryParams) {
        const f = atob(
          new URLSearchParams((currentTarget as Window).location.search).get('f') || ''
        );
        setQueryFilter({
          searchParams: new URLSearchParams(f),
        });
      } else {
        setQueryFilter({
          searchParams: new URLSearchParams((currentTarget as Window).location.search),
        });
      }
    }
  };

  useEffect(() => {
    if (useQueryParamsFromUrl) {
      window.addEventListener('popstate', popStateEvent);
    }
    return () => {
      window.removeEventListener('popstate', popStateEvent);
    };
  }, []);

  useEffect(() => {
    if (initialDataRepsonse) {
      setInitialFacets(initialDataRepsonse.facets);
    }
  }, [initialDataRepsonse]);

  useEffect(() => {
    if (useQueryParamsFromUrl) {
      const nextSearchParams = new URLSearchParams(queryFilter.searchParams);
      nextSearchParams.delete('hits');
      nextSearchParams.delete('offset');
      const nextSearch = nextSearchParams.toString() ? `?${nextSearchParams}` : '';
      if (initialize) {
        if (compressQueryParams) {
          const searchParamsFromUrl = getUrlSearchParamsFromUrl();
          const currentFilterCompressed = searchParamsFromUrl.get('f');

          const currentFQuery = new URLSearchParams(nextSearch).get('f') || '';

          const nextFilterCompressed = currentFQuery ? currentFQuery : btoa(nextSearch);
          if (currentFilterCompressed?.localeCompare(nextFilterCompressed) !== 0) {
            if (nextFilterCompressed) {
              searchParamsFromUrl.set('f', nextFilterCompressed);
            } else {
              searchParamsFromUrl.delete('f');
            }

            const nextUrlParams = decodeURIComponent(searchParamsFromUrl.toString());

            const nextUrl = nextUrlParams
              ? `${window.location.pathname}?${nextUrlParams}`
              : window.location.pathname;
            window.history.pushState(undefined, '', nextUrl);
          }
        } else if (window.location.search.localeCompare(nextSearch) !== 0) {
          window.history.pushState(undefined, '', `${window.location.pathname}${nextSearch}`);
        }
      }
    }
  }, [queryFilter, initialize, useQueryParamsFromUrl]);

  useEffect(() => {
    if (response) {
      if (!initialFacets && !useQueryParamsFromUrl) {
        setInitialFacets(response.facets);
      }

      if (queryFilter?.concatResult) {
        setDocuments([...(documents || []), ...(response.documentList.documents || [])]);
      } else {
        setDocuments(response.documentList.documents || []);
      }
    }
  }, [response, useQueryParamsFromUrl]);

  const onFilterUpdate = useCallback((nextQuery: string) => {
    {
      setQueryFilter({
        searchParams: new URLSearchParams(nextQuery),
      });
    }
  }, []);

  const onLoadMore = useCallback(() => {
    if (response) {
      setQueryFilter({
        searchParams: new URLSearchParams(response?.documentList.pagination.nextPage?.query),
        concatResult: true,
      });
    }
  }, [response]);

  const onInitialize = useCallback(
    (_initialQueryParams?: URLSearchParams) => {
      if (!initialize) {
        const searchParamsFromUrl = getUrlSearchParamsFromUrl();
        const searchParamsFromUrlDecompressed = compressQueryParams
          ? new URLSearchParams(atob(searchParamsFromUrl.get('f') || ''))
          : searchParamsFromUrl;

        const initialQueryParams = useQueryParamsFromUrl
          ? searchParamsFromUrlDecompressed
          : _initialQueryParams;

        if (useQueryParamsFromUrl && _initialQueryParams) {
          _initialQueryParams.forEach((value, key) => {
            if (!initialQueryParams?.has(key)) {
              initialQueryParams?.append(key, value);
            }
          });
        }

        if (initialQueryParams) {
          if (!initialQueryParams.has('hits')) {
            initialQueryParams.set('hits', '30');
          }
          if (!initialQueryParams.has('sort')) {
            initialQueryParams.set('sort', 'published-desc');
          }

          setQueryFilter({
            searchParams: initialQueryParams,
          });
        }
        setInitialize(true);
      }
    },
    [initialize]
  );

  const value = {
    loading,
    error,
    response,
    documents,
    initialFacets,
    queryFilter,
    onFilterUpdate,
    onLoadMore,
    onInitialize,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
