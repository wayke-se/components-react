import React, { useCallback, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import SearchBar from '../SearchBar';

const SearchFilter = () => {
  const [value, setValue] = useState('');
  const { queryFilter, onFilterUpdate } = useSearch();

  const onSearch = useCallback(
    (value: string) => {
      const nextQuery = new URLSearchParams(queryFilter.searchParams);
      if (value === nextQuery.get('query')) {
        return;
      }

      if (value) {
        nextQuery.set('query', value);
      } else {
        nextQuery.delete('query');
      }

      onFilterUpdate(nextQuery.toString());
      setValue('');
    },
    [queryFilter]
  );

  return <SearchBar value={value} setValue={setValue} onSearch={onSearch} />;
};

export default SearchFilter;
