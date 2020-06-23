import { createContext } from 'react';
import { Facet, Document, Search } from '../@types/search';
import { QueryFilter } from '../@types/queryFilter';

export interface SearchContextProps {
  loading: boolean;
  response?: Search;
  error: boolean;
  documents?: Document[];
  initialFacets?: Facet[];
  queryFilter: QueryFilter;
  onFilterUpdate: (nextQuery: string) => void;
  onLoadMore: () => void;
  onInitialize: (initialQueryParams?: URLSearchParams) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  loading: false,
  error: false,
  response: undefined,
  documents: undefined,
  initialFacets: undefined,
  queryFilter: { searchParams: new URLSearchParams() },
  onFilterUpdate: (_) => {},
  onLoadMore: () => {},
  onInitialize: (_) => {},
});
