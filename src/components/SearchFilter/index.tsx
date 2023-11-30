import React, { useCallback, useState } from 'react';
import useSearch from '../../State/Search/useSearch';
import SearchBar from '../SearchBar';
import PubSub from '../../utils/pubsub/pubsub';

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
      PubSub.publish('Search', { query: value });
    },
    [queryFilter]
  );

  return <SearchBar value={value} setValue={setValue} onSearch={onSearch} />;
};

export default SearchFilter;
