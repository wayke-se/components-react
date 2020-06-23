import React, { useState, useCallback } from 'react';
import InputSearch from '../InputSearch';
import useSearch from '../../hooks/useSearch';

const SearchFilter = () => {
  const { queryFilter, onFilterUpdate } = useSearch();
  const [value, setValue] = useState('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    []
  );

  const onSearch = useCallback(() => {
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
  }, [queryFilter, value]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        onSearch();
      }
    },
    [queryFilter, value]
  );

  return (
    <InputSearch
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onSearch={onSearch}
      placeholder="Sök"
      label="Sök"
      id="main-search"
    />
  );
};

export default SearchFilter;
