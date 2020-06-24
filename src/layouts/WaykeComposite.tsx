import React, { useCallback } from 'react';
import WaykeSearch from './search/index';
import WaykeSearchItem from './searchItem/index';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';

export interface WaykeCompositeProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams;
}

const WaykeComposite = ({ filterList, initialQueryParams }: WaykeCompositeProps) => {
  const id = useHashGuid();
  const onClickSearchItem = useCallback(() => {
    // track id
  }, []);

  return (
    <>
      {id ? (
        <WaykeSearchItem id={id} />
      ) : (
        <WaykeSearch
          filterList={filterList}
          onClickSearchItem={onClickSearchItem}
          initialQueryParams={initialQueryParams}
          hashRoute
        />
      )}
    </>
  );
};

export default WaykeComposite;
