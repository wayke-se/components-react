import React, { useEffect } from 'react';
import useHashGuid from '../hooks/useHashGuid';
import PubSub from '../utils/pubsub/pubsub';

import WaykeSearch, { WaykeSearchProps } from './search';
import WaykeSearchItem, { WaykeSearchItemProps } from './searchItem';
import usePath from '../State/Path/usePath';
import useInitializeTranslation from '../hooks/useInitializeTranslation';

export type WaykeCompositeProps = Omit<WaykeSearchProps & WaykeSearchItemProps, 'id'>;

const WaykeComposite = ({
  marketCode = 'SE',
  filterList,
  initialQueryParams,
  removeSearchBar,
  removeFilterOptions,
  disableResetScrollOnInit,
  placeholderImage,
  pathRoute,
  modifyDocumentTitleItem,
  modifyDocumentTitleSearch,
  displayBranchName,
}: WaykeCompositeProps) => {
  const hashId = useHashGuid();
  const { id: pathId } = usePath();
  const initialized = useInitializeTranslation(marketCode);

  useEffect(() => {
    if (!pathRoute) {
      if (hashId) {
        PubSub.publish('HashRouteChange', { id: hashId });
      } else {
        PubSub.publish('HashRouteChange', { id: undefined });
      }
    }
  }, [hashId]);

  const id = pathId || hashId;

  if (!initialized) return null;

  return (
    <>
      {id ? (
        <WaykeSearchItem
          marketCode={marketCode}
          id={id}
          hashRoute={!pathRoute}
          disableResetScrollOnInit={disableResetScrollOnInit}
          placeholderImage={placeholderImage}
          pathRoute={pathRoute}
          modifyDocumentTitleItem={modifyDocumentTitleItem}
          displayBranchName={displayBranchName}
        />
      ) : (
        <WaykeSearch
          marketCode={marketCode}
          filterList={filterList}
          initialQueryParams={initialQueryParams}
          removeSearchBar={removeSearchBar}
          hashRoute={!pathRoute}
          placeholderImage={placeholderImage}
          pathRoute={pathRoute}
          removeFilterOptions={removeFilterOptions}
          modifyDocumentTitleSearch={modifyDocumentTitleSearch}
          displayBranchName={displayBranchName}
        />
      )}
    </>
  );
};

export default WaykeComposite;
