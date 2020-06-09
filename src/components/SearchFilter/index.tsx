import React, { useState, useCallback } from 'react';
import InputSearch from '../InputSearch';

interface SearchFilterProps {
  searchParams: URLSearchParams;
  onFilterUpdate: (nextQuery: string) => void;
}

const SearchFilter = ({ searchParams, onFilterUpdate }: SearchFilterProps) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    []
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        const nextQuery = new URLSearchParams(searchParams);
        if (e.currentTarget.value) {
          nextQuery.set('query', e.currentTarget.value);
        } else {
          nextQuery.delete('query');
        }

        onFilterUpdate(nextQuery.toString());
      }
    },
    [searchParams]
  );

  return (
    <InputSearch
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Söker"
      label="Sök"
      id="main-search"
    />
  );
};

export default SearchFilter;
