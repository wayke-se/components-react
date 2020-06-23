import React, { useCallback } from 'react';
import DefaultSearchLayout from './search';
import DefaultSearchItemLayout from './searchItem';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';

interface BaseLayout {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams;
}

const BaseLayout = ({ filterList, initialQueryParams }: BaseLayout) => {
  const id = useHashGuid();
  const onClickSearchItem = useCallback(() => {
    // track id
  }, []);

  return (
    <>
      {id ? (
        <DefaultSearchItemLayout id={id} onClickSearchItem={onClickSearchItem} />
      ) : (
        <DefaultSearchLayout
          filterList={filterList}
          onClickSearchItem={onClickSearchItem}
          initialQueryParams={initialQueryParams}
        />
      )}
    </>
  );
};

export default BaseLayout;
