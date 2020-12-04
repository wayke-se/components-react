import React, { useEffect } from 'react';
import useHashGuid from '../hooks/useHashGuid';
import { SearchFilterTypes } from '../@types/filter';
import PubSub from '../utils/pubsub/pubsub';

import WaykeSearch from './search/index';
import WaykeSearchItem from './searchItem/index';

export interface WaykeCompositeProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  disableResetScrollOnInit?: boolean;
  placeholderImage?: string;
}

const WaykeComposite = ({
  filterList,
  initialQueryParams,
  removeSearchBar,
  disableResetScrollOnInit,
  placeholderImage,
}: WaykeCompositeProps) => {
  const id = useHashGuid();

  useEffect(() => {
    if (id) {
      PubSub.publish('HashRouteChange', id);
    } else {
      PubSub.publish('HashRouteChange');
    }
  }, [id]);

  return (
    <>
      {id ? (
        <WaykeSearchItem
          id={id}
          hashRoute
          disableResetScrollOnInit={disableResetScrollOnInit}
          placeholderImage={placeholderImage}
        />
      ) : (
        <WaykeSearch
          filterList={filterList}
          initialQueryParams={initialQueryParams}
          removeSearchBar={removeSearchBar}
          hashRoute
          placeholderImage={placeholderImage}
        />
      )}
    </>
  );
};

export default WaykeComposite;
