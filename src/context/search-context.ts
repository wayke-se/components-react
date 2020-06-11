import { createContext } from 'react';
import { Facet, Document, Search } from '../@types/search';
import { QueryFilter } from '../@types/queryFilter';

interface SearchContextProps {
  loading: boolean;
  response?: Search;
  error: boolean;
  documents?: Document[];
  initialFacets?: Facet[];
  queryFilter: QueryFilter;
  onFilterUpdate: (nextQuery: string) => void;
  onLoadMore: () => void;
  onInitialize: () => void;
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
  onInitialize: () => {},
});
