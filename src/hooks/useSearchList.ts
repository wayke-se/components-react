import { Search, Document, Facet } from '../@types/search';
import { useEffect, useState } from 'react';
import useFetch from './useFetch';

export interface QueryFilter {
  query?: string;
  concatResult?: boolean;
}

interface UseSearchList {
  loading: boolean;
  response?: Search;
  documents?: Document[];
  initialFacets?: Facet[];
  queryFilter?: QueryFilter;
}

const useSearchList = (url: string, apiKey: string, queryFilter?: QueryFilter): UseSearchList => {
  const [initialFacets, setInitialFacets] = useState<Facet[]>();
  const [documents, setDocuments] = useState<Document[]>();

  const query = new URLSearchParams(queryFilter?.query || '').toString();
  const { loading, data: response } = useFetch<Search>(`${url}${query ? `?${query}` : ''}`, {
    headers: {
      'x-api-key': apiKey,
    },
  });

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

  return { loading, response, documents, initialFacets, queryFilter };
};

export default useSearchList;
