import React, { useState, useCallback } from 'react';

import { Search } from '../@types/search';
import { QueryFilter } from '../@types/queryFilter';
import useFetch from '../hooks/useFetch';
import { RelatedSearchContext } from '../context/related-context';

interface RelatedSearchProviderProps {
  url: string;
  apiKey: string;
  children: JSX.Element;
}

const RelatedSearchProvider = ({ url, apiKey, children }: RelatedSearchProviderProps) => {
  const [queryFilter, setQueryFilter] = useState<QueryFilter>();

  const query = queryFilter?.searchParams.toString();
  const { loading, data: response, error } = useFetch<Search>(
    `${url}${query ? `?${query}` : ''}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    },
    !queryFilter
  );

  const fetchRelated = useCallback(
    (searchParams: URLSearchParams) =>
      setQueryFilter({
        searchParams,
      }),
    []
  );

  const value = {
    loading,
    error,
    response,
    queryFilter,
    fetchRelated,
  };

  return <RelatedSearchContext.Provider value={value}>{children}</RelatedSearchContext.Provider>;
};

export default RelatedSearchProvider;
