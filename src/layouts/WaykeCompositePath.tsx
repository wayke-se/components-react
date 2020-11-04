import React from 'react';
import { SearchFilterTypes } from '../@types/filter';

import WaykeSearch from './search/index';
import WaykeSearchItem from './searchItem/index';
import usePath from '../State/Path/usePath';

export interface WaykeCompositePathProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  disableResetScrollOnInit?: boolean;
  placeholderImage?: string;
}

const WaykeCompositePath = ({
  filterList,
  initialQueryParams,
  removeSearchBar,
  disableResetScrollOnInit,
  placeholderImage,
}: WaykeCompositePathProps) => {
  const { id } = usePath();

  return (
    <>
      {id ? (
        <WaykeSearchItem
          id={id}
          pathRoute
          disableResetScrollOnInit={disableResetScrollOnInit}
          placeholderImage={placeholderImage}
        />
      ) : (
        <WaykeSearch
          filterList={filterList}
          initialQueryParams={initialQueryParams}
          removeSearchBar={removeSearchBar}
          pathRoute
          placeholderImage={placeholderImage}
        />
      )}
    </>
  );
};

export default WaykeCompositePath;
