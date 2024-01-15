import React, { useState, useEffect, useCallback } from 'react';

import { Facet, Document, Search } from '../../@types/search';
import { QueryFilter } from '../../@types/queryFilter';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from './SearchContext';
import { getUrlSearchParamsFromUrl } from '../../utils/url';
import { WaykePubSub } from '../../';
import { ActionOnFilterUpdate } from '../../utils/pubsub/Actions';
import usePath from '../Path/usePath';

interface SearchProviderProps {
  url: string;
  apiKey?: string;
  useQueryParamsFromUrl?: boolean;
  pathRoute?: string;
  children: React.ReactNode;
}

const initialSearchParams = new URLSearchParams();
initialSearchParams.set('hits', '30');
initialSearchParams.set('sort', 'published-desc');

const SearchProvider = ({
  url,
  apiKey,
  useQueryParamsFromUrl,
  pathRoute,
  children,
}: SearchProviderProps) => {
  const { replaceState, pushState } = usePath();
  const [queryFilter, setQueryFilter] = useState<QueryFilter>({
    searchParams: initialSearchParams,
  });

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
  const {
    loading,
    data: response,
    error,
  } = useFetch<Search>(
    `${url}${query ? `?${query}` : ''}`,
    {
      headers: apiKey
        ? {
            'x-api-key': apiKey,
          }
        : {},
    },
    !initialize || !!queryFilter?.block
  );

  const popStateEvent = (event: PopStateEvent) => {
    const { currentTarget } = event;
    if (currentTarget) {
      const nextSearchParams = new URLSearchParams((currentTarget as Window).location.search);

      if (!nextSearchParams.has('sort')) {
        nextSearchParams.set('sort', 'published-desc');
      }

      setQueryFilter({
        searchParams: nextSearchParams,
      });
    }
  };

  useEffect(() => {
    if (useQueryParamsFromUrl) {
      window.addEventListener('popstate', popStateEvent);
    }

    const onFilterUpdateEvent: ActionOnFilterUpdate = {
      actionName: 'onFilterUpdate',
      callback: onFilterUpdate,
    };

    WaykePubSub.subscribeAction(onFilterUpdateEvent);
    return () => {
      window.removeEventListener('popstate', popStateEvent);
      WaykePubSub.unsubscribeAction(onFilterUpdateEvent);
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
      if (nextSearchParams.get('sort') === 'published-desc') {
        nextSearchParams.delete('sort');
      }

      const nextSearch = nextSearchParams.toString() ? `?${nextSearchParams}` : '';
      if (initialize) {
        if (window.location.search.localeCompare(nextSearch) !== 0) {
          const _path = pathRoute?.replace(/^\/|\/$/g, '');
          const prefix = _path ? `/${_path}/` : '/';

          const index = _path ? window.location.pathname.indexOf(prefix) : -1;
          let pathname = window.location.pathname;
          if (index > -1) {
            pathname = pathname.substr(0, index);
          }

          pushState(`${pathname}${nextSearch}`);
        }
      }
    }
  }, [queryFilter, initialize, useQueryParamsFromUrl]);

  useEffect(() => {
    if (response) {
      if (!initialFacets && !useQueryParamsFromUrl) {
        setInitialFacets(response.facets);
      }

      if (useQueryParamsFromUrl && response.query?.parameters) {
        const nextSearchParams = new URLSearchParams(response.query.parameters);
        nextSearchParams.delete('hits');
        nextSearchParams.delete('offset');
        const nextSearch = nextSearchParams.toString() ? `?${nextSearchParams}` : '';
        if (window.location.search.localeCompare(nextSearch) !== 0) {
          replaceState(`${window.location.pathname}${nextSearch}`);
          setQueryFilter({
            searchParams: new URLSearchParams(nextSearch),
            block: true,
          });
        }
      }

      if (queryFilter?.concatResult) {
        setDocuments([...(documents || []), ...(response.documentList.documents || [])]);
      } else {
        setDocuments(response.documentList.documents || []);
      }
    }
  }, [response, useQueryParamsFromUrl]);

  const onFilterUpdate = useCallback(
    (nextQuery: string) => {
      {
        if (!initialize) {
          setInitialize(true);
        }
        const nextSearchParams = new URLSearchParams(nextQuery);
        nextSearchParams.delete('offset');

        setQueryFilter({
          searchParams: nextSearchParams,
        });
      }
    },
    [initialize]
  );

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

        const initialQueryParams = useQueryParamsFromUrl
          ? searchParamsFromUrl
          : _initialQueryParams;

        if (useQueryParamsFromUrl && _initialQueryParams) {
          _initialQueryParams.forEach((value, key) => {
            if (!initialQueryParams?.getAll(key)?.some((v) => v === value)) {
              initialQueryParams?.append(key, value);
            }
          });
        }

        if (initialQueryParams) {
          const nextSearchParams = new URLSearchParams(initialQueryParams);
          nextSearchParams.delete('hits');
          nextSearchParams.delete('offset');

          if (!initialQueryParams.has('hits')) {
            initialQueryParams.set('hits', '30');
          }
          if (!initialQueryParams.has('sort')) {
            initialQueryParams.set('sort', 'published-desc');
          }

          const nextSearch = nextSearchParams.toString() ? `?${nextSearchParams}` : '';

          setQueryFilter({
            searchParams: initialQueryParams,
          });
          if (useQueryParamsFromUrl) {
            replaceState(`${window.location.pathname}${nextSearch}`);
          }
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
