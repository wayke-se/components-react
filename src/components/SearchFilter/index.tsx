import React, { useState, useCallback, useRef } from 'react';
import InputSearch from '../InputSearch/index';
import useSearch from '../../hooks/useSearch';
import useOutsideClick from '../../hooks/useOutsideClick';

const SearchFilter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { queryFilter, onFilterUpdate } = useSearch();
  const [value, setValue] = useState('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    []
  );

  useOutsideClick(ref, () => setValue(''));

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
    setValue('');
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
      ref={ref}
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
