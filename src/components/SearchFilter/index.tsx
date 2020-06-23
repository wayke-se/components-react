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

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        const nextQuery = new URLSearchParams(queryFilter.searchParams);
        if (e.currentTarget.value) {
          nextQuery.set('query', e.currentTarget.value);
        } else {
          nextQuery.delete('query');
        }

        onFilterUpdate(nextQuery.toString());
      }
    },
    [queryFilter]
  );

  return (
    <InputSearch
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Sök"
      label="Sök"
      id="main-search"
    />
  );
};

export default SearchFilter;
