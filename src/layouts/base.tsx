import React, { useCallback } from 'react';
import DefaultSearchLayout from './search/default';
import { DefaultSearchItemLayout } from '..';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';

interface BaseLayout {
  filterList?: SearchFilterTypes[];
}

const BaseLayout = ({ filterList }: BaseLayout) => {
  const id = useHashGuid();
  const onClickSearchItem = useCallback(() => {
    // track id
  }, []);

  return (
    <>
      {id ? (
        <DefaultSearchItemLayout id={id} onClickSearchItem={onClickSearchItem} />
      ) : (
        <DefaultSearchLayout filterList={filterList} onClickSearchItem={onClickSearchItem} />
      )}
    </>
  );
};

export default BaseLayout;
