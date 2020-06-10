import { useContext } from 'react';
import { SearchContext } from '../context/search-context';

const useSearch = () => useContext(SearchContext);

export default useSearch;
