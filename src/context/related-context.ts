import { createContext } from 'react';
import { Search } from '../@types/search';

export interface RelatedSearchContextProps {
  loading: boolean;
  response?: Search;
  error: boolean;
  fetchRelated: (searchParmas: URLSearchParams) => void;
}

export const RelatedSearchContext = createContext<RelatedSearchContextProps>({
  loading: false,
  error: false,
  response: undefined,
  fetchRelated: (_) => {},
});
