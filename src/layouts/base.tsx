import React, { useCallback } from 'react';
import DefaultSearchLayout from './search/index';
import DefaultSearchItemLayout from './searchItem/index';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';

export interface BaseLayoutProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams;
}

const BaseLayout = ({ filterList, initialQueryParams }: BaseLayoutProps) => {
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
