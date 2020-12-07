import React, { useEffect } from 'react';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';
import PubSub from '../utils/pubsub/pubsub';

import WaykeSearch from './search/index';
import WaykeSearchItem from './searchItem/index';
import usePath from '../State/Path/usePath';

export interface WaykeCompositeProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  disableResetScrollOnInit?: boolean;
  placeholderImage?: string;
  pathRoute?: string;
}

const WaykeComposite = ({
  filterList,
  initialQueryParams,
  removeSearchBar,
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
        />
      )}
    </>
  );
};

export default WaykeComposite;
