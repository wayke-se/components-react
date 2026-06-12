import { createContext } from 'react';
import { QueryFilter } from '../../@types/queryFilter';
import { Document, Facet, Search } from '../../@types/search';

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
  onFilterUpdate: (_) => undefined,
  onLoadMore: () => undefined,
  onInitialize: (_) => undefined,
});
