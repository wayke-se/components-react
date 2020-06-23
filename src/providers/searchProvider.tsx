import React, { useState, useEffect, useCallback } from 'react';

import { Facet, Document, Search } from '../@types/search';
import { QueryFilter } from '../@types/queryFilter';
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../context/search-context';

interface SearchProviderProps {
  url: string;
  apiKey: string;
  children: React.ReactNode;
}

const SearchProvider = ({ url, apiKey, children }: SearchProviderProps) => {
  const [queryFilter, setQueryFilter] = useState<QueryFilter>({
    searchParams: new URLSearchParams(),
  });
  const [initialFacets, setInitialFacets] = useState<Facet[]>();
  const [documents, setDocuments] = useState<Document[]>();
  const [initialize, setInitialize] = useState(false);

  const query = queryFilter.searchParams.toString();
  const { loading, data: response, error } = useFetch<Search>(
    `${url}${query ? `?${query}` : ''}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    },
    !initialize
  );

  useEffect(() => {
    if (response) {
      if (!initialFacets) {
        setInitialFacets(response.facets);
      }

      if (queryFilter?.concatResult) {
        setDocuments([...(documents || []), ...(response.documentList.documents || [])]);
      } else {
        setDocuments(response.documentList.documents || []);
      }
    }
  }, [response]);

  const onFilterUpdate = useCallback(
    (nextQuery: string) =>
      setQueryFilter({
        searchParams: new URLSearchParams(nextQuery),
      }),
    []
  );

  const onLoadMore = useCallback(() => {
    if (response) {
      setQueryFilter({
        searchParams: new URLSearchParams(response?.documentList.pagination.nextPage?.query),
        concatResult: true,
      });
    }
  }, [response]);

  const onInitialize = useCallback((initialQueryParams?: URLSearchParams) => {
    if (initialQueryParams) {
      setQueryFilter({
        searchParams: initialQueryParams,
      });
    }
    setInitialize(true);
  }, []);

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
