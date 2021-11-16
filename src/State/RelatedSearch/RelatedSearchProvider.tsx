import React, { useState, useCallback } from 'react';

import { Search } from '../../@types/search';
import { QueryFilter } from '../../@types/queryFilter';
import useFetch from '../../hooks/useFetch';
import { RelatedSearchContext } from './RelatedSearchContext';

interface RelatedSearchProviderProps {
  url: string;
  urlMlt?: string;
  apiKey?: string;
  children: React.ReactNode;
}

const RelatedSearchProvider = ({ url, urlMlt, apiKey, children }: RelatedSearchProviderProps) => {
  const [queryFilter, setQueryFilter] = useState<QueryFilter>();

  const query = queryFilter?.searchParams.toString();
  const { loading, data: response, error } = useFetch<Search>(
    `${urlMlt || url}${query ? `?${query}` : ''}`,
    {
      headers: apiKey
        ? {
            'x-api-key': apiKey,
          }
        : {},
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
    moreLikeThisUrl: !!urlMlt,
    loading,
    error,
    response,
    queryFilter,
    fetchRelated,
  };

  return <RelatedSearchContext.Provider value={value}>{children}</RelatedSearchContext.Provider>;
};

export default RelatedSearchProvider;
