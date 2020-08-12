import React, { lazy, useEffect, Suspense } from 'react';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';
import PubSub from '../utils/pubsub/pubsub';

const WaykeSearch = lazy(() => import('./search/index'));
const WaykeSearchItem = lazy(() => import('./searchItem/index'));

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
    <Suspense fallback={null}>
      {id ? (
        <WaykeSearchItem id={id} hashRoute />
      ) : (
        <WaykeSearch filterList={filterList} initialQueryParams={initialQueryParams} hashRoute />
      )}
    </Suspense>
  );
};

export default WaykeComposite;
