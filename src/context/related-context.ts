import { createContext } from 'react';
import { Search } from '../@types/search';

export interface RelatedSearchContextProps {
  moreLikeThisUrl: boolean;
  loading: boolean;
  response?: Search;
  error: boolean;
  fetchRelated: (searchParmas: URLSearchParams) => void;
}

export const RelatedSearchContext = createContext<RelatedSearchContextProps>({
  moreLikeThisUrl: false,
  loading: false,
  error: false,
  response: undefined,
  fetchRelated: (_) => {},
});
