import React, { useEffect } from 'react';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';
import PubSub from '../utils/pubsub/pubsub';

import WaykeSearch from './search/index';
import WaykeSearchItem from './searchItem/index';

export interface WaykeCompositeProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams;
}

const WaykeComposite = ({ filterList, initialQueryParams }: WaykeCompositeProps) => {
  const id = useHashGuid();

  useEffect(() => {
    if (id) {
      PubSub.publish('HashRouteChange', id);
    }
  }, [id]);

  return (
    <>
      {id ? (
        <WaykeSearchItem id={id} hashRoute />
      ) : (
        <WaykeSearch filterList={filterList} initialQueryParams={initialQueryParams} hashRoute />
      )}
    </>
  );
};

export default WaykeComposite;
