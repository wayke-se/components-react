import React, { useEffect } from 'react';
import useHashGuid from '../hooks/useHashGuid';
import PubSub from '../utils/pubsub/pubsub';

import WaykeSearch, { WaykeSearchProps } from './search/index';
import WaykeSearchItem, { WaykeSearchItemProps } from './searchItem/index';
import usePath from '../State/Path/usePath';

export type WaykeCompositeProps = Omit<WaykeSearchProps & WaykeSearchItemProps, 'id'>;

const WaykeComposite = ({
  filterList,
  initialQueryParams,
  removeSearchBar,
  removeFilterOptions,
  disableResetScrollOnInit,
  placeholderImage,
  pathRoute,
}: WaykeCompositeProps) => {
  const hashId = useHashGuid();
  const { id: pathId } = usePath();

  useEffect(() => {
    if (!pathRoute) {
      if (hashId) {
        PubSub.publish('HashRouteChange', hashId);
      } else {
        PubSub.publish('HashRouteChange');
      }
    }
  }, [hashId]);

  const id = pathId || hashId;

  return (
    <>
      {id ? (
        <WaykeSearchItem
          id={id}
          hashRoute={!pathRoute}
          disableResetScrollOnInit={disableResetScrollOnInit}
          placeholderImage={placeholderImage}
          pathRoute={pathRoute}
        />
      ) : (
        <WaykeSearch
          filterList={filterList}
          initialQueryParams={initialQueryParams}
          removeSearchBar={removeSearchBar}
          hashRoute={!pathRoute}
          placeholderImage={placeholderImage}
          pathRoute={pathRoute}
          removeFilterOptions={removeFilterOptions}
        />
      )}
    </>
  );
};

export default WaykeComposite;
